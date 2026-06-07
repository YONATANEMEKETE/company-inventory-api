import { prisma } from '../../shared/db/prisma.js';
import { Workspace } from '../../shared/types/app-models.js';

export class WorkspaceRepository {
  async create(data: { name: string }): Promise<Workspace> {
    return prisma.workspace.create({
      data,
    });
  }

  async findByName(name: string): Promise<Workspace | null> {
    return prisma.workspace.findFirst({
      where: { name },
    });
  }

  async findById(id: string): Promise<Workspace | null> {
    return prisma.workspace.findUnique({
      where: { id },
    });
  }
}

export const workspaceRepository = new WorkspaceRepository();
