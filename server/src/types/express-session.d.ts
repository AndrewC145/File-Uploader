import session from 'express-session';

declare module 'express-session' {
  export interface SessionData {
    homeFolderId: number;
  }
}

declare global {
  namespace Express {
    interface User {
      id: number;
    }
  }
}

Express.User;
