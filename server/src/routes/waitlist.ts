import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const router = Router();
const prisma = new PrismaClient();

// Validation rules
const validateWaitlist = [
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('role').isIn(['Patient', 'Nurse']).withMessage('Invalid role'),
  body('city').notEmpty().withMessage('City is required'),
  body('language').isIn(['Français', 'English']).withMessage('Invalid language'),
  body('consent').isBoolean().withMessage('Consent must be a boolean').custom(value => value === true).withMessage('Consent is required'),
];

router.post('/', validateWaitlist, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, phone, role, city, language, consent } = req.body;

  try {
    // Check if email already exists
    const existingUser = await prisma.waitlist.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const newEntry = await prisma.waitlist.create({
      data: {
        fullName,
        email,
        phone,
        role,
        city,
        language,
        consent,
      },
    });

    // Send confirmation email (Mocked for now as we don't have SMTP credentials)
    // In production, configure nodemailer transporter with real credentials
    /*
    const transporter = nodemailer.createTransport({
      // service: 'gmail',
      // auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
    await transporter.sendMail({ ... });
    */

    res.status(201).json({ message: 'Successfully joined the waitlist', data: newEntry });
  } catch (error) {
    console.error('Error saving to waitlist:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

