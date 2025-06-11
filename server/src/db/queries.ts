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

async function checkUser(username: string, password: string): Promise<boolean> {
  const hashed = await hashPassword(password);
  const user = await prisma.users.findUnique({
    where: {
      username: username,
    },
  });

  const validUser = user && (await bcrypt.compare(password, hashed));

  return validUser ? true : false;
}

export { hashPassword, checkUser, findUser };
