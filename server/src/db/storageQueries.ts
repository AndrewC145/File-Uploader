import prisma from '../client';

async function storeFile(
  fileId: string,
  userId: number,
  fileName: string,
  folderId: number,
  fileSize: number,
  fileType: string
): Promise<any> {
  const existingFile = await findFile(userId, fileId, folderId);

  if (existingFile) {
    throw new Error('File already exists in this folder');
  }

  const file = await prisma.file.create({
    data: {
      id: fileId,
      authorId: userId,
      name: fileName,
      folderId: folderId,
      size: fileSize,
      type: fileType,
    },
  });

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

async function deleteFolderFromDB(folderId: number): Promise<void> {
  await prisma.folder.delete({
    where: {
      id: folderId,
    },
  });

  await prisma.file.deleteMany({
    where: {
      folderId: folderId,
    },
  });
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
async function deleteFile(fileId: string): Promise<any> {
  const file = await prisma.file.delete({
    where: {
      id: fileId,
    },
  });

  return file;
}

async function findFile(
  userId: number,
  fileId: string,
  folderId: number
): Promise<any> {
  const file = await prisma.file.findFirst({
    where: {
      authorId: userId,
      id: fileId,
      folderId: folderId,
    },
  });

  return file;
}

async function findHome(userId: number): Promise<any> {
  const folder = await prisma.folder.findFirst({
    where: {
      authorId: userId,
      name: 'Home',
    },
  });

  return folder;
}

export {
  storeFile,
  storeFolder,
  deleteFolderFromDB,
  fetchFilesFromDB,
  fetchHomeFiles,
  findFolderById,
  deleteFile,
  findFile,
  findHome,
};
