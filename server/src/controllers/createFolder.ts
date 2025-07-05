import { Request, Response, NextFunction } from 'express';
import { storeFolder } from '../db/queries';
import { supabase } from '../db/supabaseClient';

async function createFolder(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const folderName = req.body.folderName;
    const userId = Number(req.params.userId);

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    await storeFolder(userId, folderName);
    await uploadFolderToSupabase(userId, folderName);
  } catch (error: any) {
    console.error('Error creating folder:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

async function uploadFolderToSupabase(
  userId: number,
  folderName: string
): Promise<any> {
  const dummyFileName = '/.placeholder.txt';
  const dummyFileContent = new Blob(['Placeholder content, safe to delete'], {
    type: 'text/plain',
  });

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
