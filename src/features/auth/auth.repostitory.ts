import { prisma } from '../../shared/db/prisma.js';
import { User } from '../../shared/types/app-models.js';

export class AuthRepository {
  // NOTE: find by email
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  // NOTE: find by id
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  // NOTE: create user
  async registerNewUser(data: {
    email: string;
    passwordHash: string;
    workspaceName: string;
  }): Promise<User> {
    // NOTE: transaction
    return prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: data.email,
          passwordHash: data.passwordHash,
        },
      });

      const workspace = await tx.workspace.create({
        data: {
          name: data.workspaceName,
        },
      });

      await tx.workspaceMember.create({
        data: {
          workspaceId: workspace.id,
          userId: user.id,
          role: 'ADMIN',
        },
      });

      return user;
    });
  }
}

export const authRepository = new AuthRepository();
