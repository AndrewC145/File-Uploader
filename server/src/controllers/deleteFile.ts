import { Request, Response } from 'express';
import { supabase } from '../db/supabaseClient';
import { deleteFile } from '../db/storageQueries';

async function deleteFileFromStorage(
  req: Request,
  res: Response
): Promise<void> {
  const { fileId } = req.body;

  const supabaseDel = await supabaseDeleteFile;
}

async function supabaseDeleteFile(
  folderName: string,
  fileName: string
): Promise<void> {}

export default deleteFileFromStorage;
