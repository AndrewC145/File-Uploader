import { Request, Response, NextFunction } from 'express';

function logout(req: Request, res: Response, next: NextFunction) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({ message: 'Internal server error.' });
      }
    });

    return res.status(200).json({ message: 'Logout successful' });
  });
}

export default logout;
