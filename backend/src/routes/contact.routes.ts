import { Router } from 'express';
import { getContactMessages, createContactMessage } from '../controllers/contact.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

// Public endpoint to send a message
router.post('/', createContactMessage);

// Protected endpoint to read messages (super_admin only)
router.get('/', authenticate, authorize('super_admin'), getContactMessages);

export default router;
