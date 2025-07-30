import { supabase } from '../db/supabaseClient';
import { Request, Response } from 'express';
import { findFolderById, findFile } from '../db/storageQueries';

async function downloadFile(req: Request, res: Response) {
  const fileId = req.query.fileId as string;
  const userId: number = Number(req.query.userId);
  const folderId: number = Number(req.query.folderId);

  try {
    if (!fileId || !userId || !folderId) {
      return res
        .status(400)
        .json({ message: 'File ID, User ID, and Folder ID are required.' });
    }

    const folderName = await findFolderById(folderId);
    const file = await findFile(userId, fileId, folderId);

    if (!folderName) {
      return res.status(404).json({ message: 'Folder not found.' });
    }

    if (!file) {
      return res.status(404).json({ message: 'File not found.' });
    }

    const fileName = file.name;

    const { data, error } = await supabase.storage
      .from('users')
      .download(`${userId}/${folderName}/${fileName}`);

    if (error || !data) {
      console.error('Error downloading file:', error);
      throw new Error(error.message);
    }

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', data.type);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');

    res.status(200).send(Buffer.from(await data.arrayBuffer()));
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
}

export default downloadFile;
