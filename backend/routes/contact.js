import express from 'express';
import { sendContactEmail } from '../controllers/contactController.js';

const router = express.Router();

/**
 * POST /api/contact
 * Handle contact form submission
 * Body: { name, email, website?, message }
 */
router.post('/', sendContactEmail);

export default router;
