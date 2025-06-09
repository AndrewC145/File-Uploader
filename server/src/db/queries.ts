import prisma from '../client';
import bcrypt from 'bcryptjs';

async function hashPassword(password: string): Promise<any> {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function checkUser(username: string, password: string): Promise<boolean> {
  const hashed = await hashPassword(password);
  const user = await prisma.users.findUnique({
    where: {
      username: username,
      password: hashed,
    },
  });

  return user ? true : false;
}

export { hashPassword, checkUser };
