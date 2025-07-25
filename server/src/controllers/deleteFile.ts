import { Request, Response } from 'express';
import { supabase } from '../db/supabaseClient';
import { deleteFile, findFolderById } from '../db/storageQueries';

async function deleteFileFromStorage(
  req: Request,
  res: Response
): Promise<any> {
  const { fileId, folderId } = req.body;

  if (!fileId || !folderId) {
    return res
      .status(400)
      .json({ error: 'File ID and Folder ID are required.' });
  }

  const folderName = await findFolderById(folderId);

  await supabaseDeleteFile(folderName, fileId);
  await deleteFile(fileId);

  return res.status(200).json({
    message: 'File deleted successfully.',
  });
}

async function supabaseDeleteFile(
  folderName: string,
  fileName: string
): Promise<void> {
  if (!folderName || !fileName) {
    throw new Error('Folder name and file name are required.');
  }

  const { data, error } = await supabase.storage
    .from('users')
    .remove([`${folderName}/${fileName}`]);

  if (!data) {
    throw new Error('File not found or already deleted.');
  }

  if (error) {
    throw new Error(`Error deleting file: ${error}`);
  }
}

export default deleteFileFromStorage;
