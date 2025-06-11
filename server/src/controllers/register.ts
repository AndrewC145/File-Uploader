import { Request, Response } from 'express';
import { body, Result, validationResult } from 'express-validator';
import prisma from '../client';
import { hashPassword, checkUser, findUser } from '../db/queries';

const registerValidation = [
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .bail()
    .isLength({ min: 3 })
    .bail()
    .withMessage('Username must be at least 3 characters long')
    .isAlphanumeric()
    .bail()
    .withMessage('Username must be alphanumeric')
    .custom(async (value: string) => {
      const userExists = await findUser(value);

      if (userExists) {
        throw new Error('Username already exists');
      }

      return value;
    }),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/\d/)
    .bail()
    .withMessage('Password must contain at least one number'),

  body('confirmPassword')
    .notEmpty()
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

  try {
    const user = await prisma.users.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });
    return res.status(201).json({ message: 'User created successfully', user });
  } catch (error: any) {
    return res.status(400).json({ error: error });
  }
}

export { registerValidation, registerUser };
