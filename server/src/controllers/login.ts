import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { body, Result, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import prisma from '../client';
import { checkUser, fetchHomeFolder } from '../db/queries';
import { Users } from '../../generated/prisma';

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
      const isValid = await checkUser(req.body.username, value);

      if (!isValid) {
        throw new Error('Invalid password');
      }

      return value;
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
      const user: Users = await checkUser(username, password);
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
    const userData: any = await prisma.users.findUnique({
      where: { id: user.id },
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
    const errorMessages: string[] = errors.array().map((err) => err.msg);
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
      req.login(user, async (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }

        try {
          const homeFolder = await fetchHomeFolder(user.id);
          req.session.homeFolderId = homeFolder.id;
          return res.status(200).json({
            message: `Login successful, Hi ${user.username}`,
            user,
            homeFolderId: homeFolder.id,
          });
        } catch (err) {
          console.error('Error fetching home folder:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
      });
    }
  })(req, res, next);
}

export { loginValidation, loginUser };
