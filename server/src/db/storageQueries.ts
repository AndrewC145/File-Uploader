import prisma from '../client';

async function storeFile(
  userId: number,
  fileName: string,
  folderId: number,
  fileSize: number,
  fileType: string
): Promise<any> {
  const file = await prisma.file.create({
    data: {
      authorId: userId,
      name: fileName,
      folderId: folderId,
      size: fileSize,
      type: fileType,
    },
  });

  console.log('File stored in database:', file);
  return file;
}

async function storeFolder(userId: number, folderName: string): Promise<any> {
  const existingFolder = await prisma.folder.findFirst({
    where: {
      authorId: userId,
      name: folderName,
    },
  });

  if (existingFolder) {
    throw new Error('Folder already exists');
  }

  const folder = await prisma.folder.create({
    data: {
      authorId: userId,
      name: folderName,
    },
  });

  return folder;
}

async function deleteFolderFromDB(folderId: number): Promise<any> {
  const folder = await prisma.folder.delete({
    where: {
      id: folderId,
    },
  });

  console.log('Folder deleted:', folder);
  return folder;
}

async function fetchFilesFromDB(folderId: number): Promise<any> {
  const files = await prisma.file.findMany({
    where: {
      folderId: folderId,
    },
  });

  return files;
}

async function fetchHomeFiles(userId: number, folderId: number): Promise<any> {
  const files = await prisma.file.findMany({
    where: {
      authorId: userId,
      folderId: folderId,
    },
  });

  console.log('Home files fetched:', files);
  return files;
}

async function findFolderById(folderId: number): Promise<any> {
  const folder = await prisma.folder.findUnique({
    where: {
      id: folderId,
    },
  });

  if (!folder) {
    throw new Error('Folder not found');
  }

  return folder.name;
}

export {
  storeFile,
  storeFolder,
  deleteFolderFromDB,
  fetchFilesFromDB,
  fetchHomeFiles,
  findFolderById,
};
