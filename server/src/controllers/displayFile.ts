import { Request, Response } from 'express';
import { supabase } from '../db/supabaseClient';
import { findHome } from '../db/storageQueries';

async function displayFiles(req: Request, res: Response): Promise<any> {
  try {
    const folderId: number = Number(req.params.folderId);
    const folderName: string = req.params.folderName;
    const id: number = Number(req.params.userId);

    if (!folderId) {
      return res.status(400).json({ message: 'Folder ID is required.' });
    }

    const homeFolder = await findHome(id);

    if (!homeFolder) {
      return res.status(404).json({ message: 'Home folder is required.' });
    }

    const homeId = homeFolder.id;

    const storageFiles = await getFilesFromSupabase(id, folderName);

    return res
      .status(200)
      .json({ message: 'Files fetched successfully.', storageFiles, homeId });
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
    return data;
  }
}

async function displayHomeFiles(req: Request, res: Response): Promise<any> {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }
    const userId: number = Number(req.query.userId);

    if (req.user.id !== userId) {
      return res.status(403).json({ message: 'Unauthorized access.' });
    }

    const homeFiles = await getFilesFromSupabase(userId, 'Home');
    return res.status(200).json({
      message: 'Home files fetched successfully.',
      homeFiles: homeFiles,
    });
  } catch (error: any) {
    console.error('Error fetching home files:', error);
    return res.status(500).json({ message: 'Failed to fetch home files' });
  }
}

export default { displayFiles, displayHomeFiles };
