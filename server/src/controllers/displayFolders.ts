import prisma from '../client';
import { Request, Response } from 'express';

async function displayFolders(req: Request, res: Response): Promise<any> {
  const userId = Number(req.params.userId);

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const folders = await prisma.folder.findMany({
      where: { authorId: userId },
    });
    return res
      .status(200)
      .json(folders.map((folder) => ({ name: folder.name, id: folder.id })));
  } catch (error: any) {
    console.error('Error fetching folders:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default displayFolders;
