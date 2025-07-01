import { Request, Response, NextFunction } from 'express';
import { storeFolder } from '../db/queries';
import { supabase } from '../db/supabaseClient';

async function createFolder(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    console.log(req.body);
  } catch (error: any) {
    console.error('Error creating folder:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

export default createFolder;
