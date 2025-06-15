import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import registerRoute from './routes/registerRoute';
import loginRoute from './routes/loginRoute';
import logoutRoute from './routes/logoutRoute';

const app = express();
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true,
};

const PORT = process.env.PORT || 3000;
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET is not defined.');
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(passport.initialize());
app.use(passport.authenticate('session'));
app.use(passport.session());

app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    user: req.isAuthenticated() ? req.user : null,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
