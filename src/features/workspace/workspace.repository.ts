import { prisma } from '../../shared/db/prisma.js';
import {
  Workspace,
  WorkspaceMember,
  WorkspaceRole,
} from '../../shared/types/app-models.js';

export class WorkspaceRepository {
  // NOTE: create workspace
  async create(data: { name: string }): Promise<Workspace> {
    return prisma.workspace.create({
      data,
    });
  }

  // NOTE: find workspace by name
  async findByName(name: string): Promise<Workspace | null> {
    return prisma.workspace.findFirst({
      where: { name },
    });
  }

  // NOTE: find workspace by id
  async findById(id: string): Promise<Workspace | null> {
    return prisma.workspace.findUnique({
      where: { id },
    });
  }

  // NOTE: delete workspace
  async deleteWorkspace(workspaceId: string) {
    return prisma.workspace.delete({
      where: { id: workspaceId },
    });
  }

  // NOTE: update workspace
  async updateWorkspace(workspaceId: string, name: string): Promise<Workspace> {
    return prisma.workspace.update({
      where: { id: workspaceId },
      data: { name },
    });
  }

  // NOTE: get lists of workpsace a user belongs to
  async getWorkspacesForUser(userId: string): Promise<Workspace[]> {
    return prisma.workspace.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
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

  // NOTE: find a memebership by userid and workspaceid
  async findMembership(
    userId: string,
    workspaceId: string,
  ): Promise<WorkspaceMember | null> {
    return prisma.workspaceMember.findUnique({
      where: {
        workspaceId_userId: { workspaceId, userId },
      },
    });
  }
}

export const workspaceRepository = new WorkspaceRepository();
