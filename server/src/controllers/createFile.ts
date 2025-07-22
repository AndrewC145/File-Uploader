import { Request, Response } from 'express';
import { supabase } from '../db/supabaseClient';
import { storeFile, findFolderById } from '../db/storageQueries';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

async function uploadFile(req: Request, res: Response): Promise<any> {
  try {
    console.log(req.body);
    const file: any = req.file;

    if (!file) {
      return res.status(400).json({ message: 'Please upload a file.' });
    }

    const user: number = Number(req.body.userId);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    const folderId: number = Number(req.body.folderId);

    if (!folderId) {
      return res.status(400).json({ message: 'Folder ID is required.' });
    }

    const folder = await findFolderById(folderId);

    if (!folder) {
      return res.status(404).json({ message: 'Folder not found.' });
    }

    let cleanName = cleanFileName(file.originalname);

    await storeFile(user, cleanName, folderId, file.size, file.mimetype);
    await uploadFileToSupabase(file, user, folder);
    return res.status(200).json({ message: 'File uploaded successfully.' });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

async function uploadFileToSupabase(
  file: Express.Multer.File,
  userId: number,
  folder: string = 'Home'
): Promise<any> {
  const fileName = file.originalname;

  let cleanName = cleanFileName(fileName);

  const { data, error } = await supabase.storage
    .from('users')
    .upload(`${userId}/${folder}/${cleanName}`, file.buffer, {
      upsert: false,
      contentType: file.mimetype,
    });

  if (error) {
    console.error('Error uploading file to Supabase:', error);
    throw new Error(error.message);
  }
  console.log('File uploaded to Supabase:', data);
  return data;
}

function cleanFileName(fileName: string): string {
  let clean = fileName;
  if (!isValidKey(fileName)) {
    clean = replaceInvalidChar(fileName);
  }

  if (fileName.length > 45) {
    clean = fileName.slice(0, 45);
  }

  return clean;
}

function isValidKey(key: string): boolean {
  return /^(\w|\/|!|-|\.|\*|'|\(|\)| |&|\$|@|=|;|:|\+|,|\?)*$/.test(key);
}

function replaceInvalidChar(name: string): string {
  return name.replace(/[^\w\/!-.\*'()\s&\$@=;:\+,?]/g, '');
}

export { uploadFile, upload };
