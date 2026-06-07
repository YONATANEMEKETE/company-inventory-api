import { prisma } from '../../shared/db/prisma.js';
import {
  Workspace,
  WorkspaceMember,
  WorkspaceRole,
} from '../../shared/types/app-models.js';

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

  // NOTE: create member
  async createMember(data: {
    workspaceId: string;
    userId: string;
    role: WorkspaceRole;
  }): Promise<WorkspaceMember> {
    return prisma.workspaceMember.create({
      data,
    });
  }
}

export const workspaceRepository = new WorkspaceRepository();
