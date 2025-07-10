import prisma from '../client';
import bcrypt from 'bcryptjs';

async function hashPassword(password: string): Promise<any> {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function findUser(username: string) {
  const userExists = await prisma.users.findUnique({
    where: {
      username: username,
    },
  });

  return userExists ? true : false;
}

async function checkUser(username: string, password: string): Promise<any> {
  const user = await prisma.users.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    return false;
  }

  const validUser = await bcrypt.compare(password, user.password);

  return validUser ? user : false;
}

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

export {
  hashPassword,
  checkUser,
  findUser,
  storeFile,
  storeFolder,
  deleteFolderFromDB,
  fetchFilesFromDB,
};
