import { Request, Response } from 'express';
import { supabase } from '../db/supabaseClient';
import { deleteFile, findFolderById, findFile } from '../db/storageQueries';

async function deleteFileFromStorage(
  req: Request,
  res: Response
): Promise<any> {
  const { userId, fileId, folderId } = req.body;

  if (!fileId || !folderId || !userId) {
    return res
      .status(400)
      .json({ error: 'User ID, File ID and Folder ID are required.' });
  }

  const folderName = await findFolderById(folderId);
  const file = await findFile(userId, fileId, folderId);
  const fileName = file.name;

  await supabaseDeleteFile(userId, folderName, fileName);
  await deleteFile(fileId);

  return res.status(200).json({
    message: 'File deleted successfully.',
  });
}

async function supabaseDeleteFile(
  userId: string,
  folderName: string,
  fileName: string
): Promise<void> {
  if (!folderName || !fileName) {
    throw new Error('Folder name and file name are required.');
  }

  console.log(folderName, fileName);

  const { data, error } = await supabase.storage
    .from('users')
    .remove([`${userId}/${folderName}/${fileName}`]);

  if (!data) {
    throw new Error('File not found or already deleted.');
  }

  if (error) {
    throw new Error(`Error deleting file: ${error}`);
  }
}

export default deleteFileFromStorage;
