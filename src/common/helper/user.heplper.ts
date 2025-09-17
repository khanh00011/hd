import { PrismaClient } from '@prisma/client';

export class UserHelper {
  static async finUserByEmail(prisma: PrismaClient, email: string) {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
}
