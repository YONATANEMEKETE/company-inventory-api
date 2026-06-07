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
  async create(data: { email: string; passwordHash: string }): Promise<User> {
    return prisma.user.create({
      data,
    });
  }
}

export const authRepository = new AuthRepository();
