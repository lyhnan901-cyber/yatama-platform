import { Router, Request, Response } from 'express';
import Stripe from 'stripe';
import prisma from '../config/database';

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-12-18.acacia' });

// Stripe webhook — verify signature + update donation status
router.post('/stripe', async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string | undefined;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (webhookSecret) {
      if (!sig) {
        res.status(400).json({ error: 'Missing stripe-signature header' });
        return;
      }
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } else {
      // Fallback for development without signature verification
      const body = Buffer.isBuffer(req.body) ? JSON.parse(req.body.toString()) : req.body;
      event = body as Stripe.Event;
    }
  } catch (err) {
    res.status(400).json({ error: 'Webhook signature verification failed' });
    return;
  }

  try {
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const receiptNumber = paymentIntent.metadata?.receiptNumber;

      if (receiptNumber) {
        const donation = await prisma.donation.findFirst({
          where: { receiptNumber, status: 'pending' },
        });

        if (donation) {
          await prisma.$transaction(async (tx) => {
            await tx.donation.update({
              where: { id: donation.id },
              data: { status: 'completed' },
            });

            await tx.donor.update({
              where: { id: donation.donorId },
              data: { totalDonated: { increment: donation.amount } },
            });

            if (donation.projectId) {
              await tx.project.update({
                where: { id: donation.projectId },
                data: { currentAmount: { increment: donation.amount } },
              });
            }
          });
        }
      }
    }

    res.json({ received: true });
  } catch (err) {
    res.status(400).json({ error: 'Webhook processing failed' });
  }
});

export default router;
