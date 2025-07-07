import { Request, Response } from 'express';
import { storeFolder } from '../db/queries';
import { supabase } from '../db/supabaseClient';
import { Folder } from '../../generated/prisma';

async function createFolder(req: Request, res: Response): Promise<any> {
  try {
    const folderName: string = req.body.folderName;
    const userId: number = Number(req.params.userId);

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    const folder: Folder = await storeFolder(userId, folderName);
    await uploadFolderToSupabase(userId, folderName);

    return res.status(200).json({
      message: 'Folder created successfully.',
      folder,
    });
  } catch (error: any) {
    console.error('Error creating folder:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

async function uploadFolderToSupabase(
  userId: number,
  folderName: string
): Promise<any> {
  const dummyFileName: string = '/.placeholder.txt';
  const dummyFileContent: Blob = new Blob(
    ['Placeholder content, safe to delete'],
    {
      type: 'text/plain',
    }
  );

  const { data, error } = await supabase.storage
    .from('users')
    .upload(`${userId}/${folderName}/${dummyFileName}`, dummyFileContent);

  if (error) {
    console.error('Error uploading folder to Supabase:', error);
    throw new Error('Failed to upload folder to Supabase');
  } else {
    console.log('Folder uploaded to Supabase:', data);
    return data;
  }
}

export default createFolder;
