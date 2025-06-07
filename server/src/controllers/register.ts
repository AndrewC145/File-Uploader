import { Request, Response } from 'express';
import { body, Result, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import prisma from '../client';

const registerValidation = [
  body('username')
    .isEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric'),

  body('password')
    .isEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/\d/)
    .withMessage('Password must contain at least one number'),

  body('confirmPassword')
    .isEmpty()
    .withMessage('Confirm Password is required')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),
];

async function registerUser(req: Request, res: Response): Promise<any> {
  const errors: Result = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    return res.status(400).json({ error: errorMessages });
  }

  const { username, password } = req.body;
  const hashedPassword: string = await hashPassword(password);
  await prisma.users.create({
    data: {
      username: username,
      password: hashedPassword,
    },
  });
}

async function hashPassword(password: string): Promise<any> {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export { registerValidation, registerUser };
