import { Request, Response } from 'express';
import { supabase } from '../db/supabaseClient';
import { storeFile } from '../db/queries';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

async function uploadFile(req: Request, res: Response): Promise<any> {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'Please upload a file.' });
    }

    const user = req.body.user;

    if (!user || !user.id) {
      return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    console.log(file);
    await uploadFileToSupabase(file, user.id);
    return res.status(200).json({ message: 'File uploaded successfully.' });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

async function uploadFileToSupabase(
  file: Express.Multer.File,
  userId: string,
  folder: string = 'Home'
): Promise<any> {
  const { data, error } = await supabase.storage
    .from('users')
    .upload(`${userId}/${folder}`, file.buffer, {
      upsert: true,
      contentType: file.mimetype,
    });

  if (error) {
    console.error('Error uploading file to Supabase:', error);
    throw new Error('Failed to upload file to Supabase');
  }
  console.log('File uploaded to Supabase:', data);
  return data;
}

export { uploadFile, upload };
