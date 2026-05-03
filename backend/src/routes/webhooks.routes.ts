import { Router, Request, Response } from 'express';
import prisma from '../config/database';

const router = Router();

// Stripe webhook — update donation status when payment succeeds
router.post('/stripe', async (req: Request, res: Response) => {
  try {
    const event = req.body;

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
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
