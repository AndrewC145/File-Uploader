import { Request, Response } from 'express';
import { supabase } from '../db/supabaseClient';
import { deleteFolderFromDB } from '../db/storageQueries';

async function deleteFolder(req: Request, res: Response): Promise<any> {
  const { folderId, userId, folderName } = req.body;

  if (!folderId) {
    res.status(400).json({ error: 'Folder ID is required' });
    return;
  }
  await deleteFolderFromDB(folderId);
  const deletedSupabaseFiles = await deleteFolderFromSupabase(
    userId,
    folderName
  );

  return res.status(200).json({
    message: 'Folder deleted successfully',
    deletedSupabaseFiles,
  });
}

async function deleteFolderFromSupabase(
  userId: number,
  folderName: string
): Promise<any> {
  const { data, error } = await supabase.storage
    .from('users')
    .list(`${userId}/${folderName}`);

  if (!data) {
    console.log('No files found in folder:', folderName);
    return;
  }

  if (error) {
    console.log('Error listing files in folder:', error);
  }

  const filesToDelete = data.map(
    (file) => `${userId}/${folderName}/${file.name}`
  );

  const { data: list, error: deleteError } = await supabase.storage
    .from('users')
    .remove(filesToDelete);

  if (deleteError) {
    console.error('Error deleting files from Supabase:', deleteError);
    throw new Error('Failed to delete files from Supabase');
  } else {
    return list;
  }
}

export default deleteFolder;
