import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { body, Result, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import prisma from '../client';
import { hashPassword, checkUser } from '../db/queries';

const loginValidation = [
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .bail()
    .custom(async (value: string) => {
      const user = await prisma.users.findUnique({
        where: { username: value },
      });

      if (!user) {
        throw new Error('Username does not exist');
      }

      return value;
    }),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .custom(async (value: string, { req }) => {
      const hashed = await hashPassword(value);
      const isValid = await checkUser(req.body.username, hashed);

      if (!isValid) {
        throw new Error('Invalid username or password');
      }

      return hashed;
    }),
];

passport.use(
  new LocalStrategy(async function verify(
    username: string,
    password: string,
    cb: Function
  ) {
    await prisma.$connect();
    try {
      const user = await checkUser(username, password);
      if (!user) {
        await prisma.$disconnect();
        return cb(null, false, { message: 'Incorrect username or password' });
      }

      return cb(null, user);
    } catch (err: any) {
      console.error('Error during user verification:', err);
      await prisma.$disconnect();
      return cb(err);
    }
  })
);

passport.serializeUser(function (user: any, cb: Function) {
  process.nextTick(() => {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(async function (user: any, cb: Function) {
  try {
    const userData = await prisma.users.findUnique({
      where: { username: user.username },
    });

    if (userData) {
      return cb(null, userData);
    }
  } catch (err: any) {
    return cb(err);
  }
});

async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const errors: Result = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    return res.status(400).json({ error: errorMessages });
  }

  passport.authenticate('local', (err: any, user: any) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    if (user) {
      req.login(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }

        return res.status(200).json({ message: 'Login successful', user });
      });
    }
  })(req, res, next);
}

export { loginValidation, loginUser };
