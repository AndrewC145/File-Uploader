import { Request, Response } from 'express';
import { supabase } from '../db/supabaseClient';
import { fetchFilesFromDB } from '../db/queries';

async function displayFiles(req: Request, res: Response): Promise<any> {
  try {
    const folderId: number = Number(req.body.folderId);
    const folderName: string = req.body.folderName;
    const id: number = Number(req.body.userId);

    if (!folderId) {
      return res.status(400).json({ message: 'Folder ID is required.' });
    }

    const files = await fetchFilesFromDB(folderId);
    const storageFiles = await getFilesFromSupabase(id, folderName);

    return res
      .status(200)
      .json({ message: 'Files fetched successfully.', files, storageFiles });
  } catch (error: any) {
    console.error('Error fetching files:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

async function getFilesFromSupabase(
  userId: number,
  folder: string
): Promise<any> {
  const { data, error } = await supabase.storage
    .from('users')
    .list(`${userId}/${folder}`);

  if (error) {
    console.error('Error fetching files from Supabase:', error);
    throw new Error('Failed to fetch files from Supabase');
  } else {
    console.log('Files fetched from Supabase:', data);
  }
}

export default displayFiles;
