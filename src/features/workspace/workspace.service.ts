import { Workspace } from '../../shared/types/app-models.js';
import { workspaceRepository } from './workspace.repository.js';
import { notFoundError, validationError } from '../../shared/errors/errors.js';

export class WorkspaceService {
  // NOTE: get workspace by id
  async getWorkspaceById(workspaceId: string): Promise<Workspace> {
    const workspace = await workspaceRepository.findById(workspaceId);
    if (!workspace) {
      throw notFoundError('Workspace not found.');
    }
    return workspace;
  }

  // NOTE: delete workspace
  async deleteWorkspace(workspaceId: string) {
    const workspace = await workspaceRepository.findById(workspaceId);
    if (!workspace) {
      throw notFoundError('Workspace not found.');
    }
    await workspaceRepository.deleteWorkspace(workspaceId);
  }

  // NOTE: update workspace
  async updateWorkspace(workspaceId: string, name: string): Promise<Workspace> {
    const existingWorkspace = await workspaceRepository.findByName(name);
    if (existingWorkspace && existingWorkspace.id !== workspaceId) {
      throw validationError(
        'Workspace name already exists. use a different name',
      );
    }

    const workspace = await workspaceRepository.findById(workspaceId);
    if (!workspace) {
      throw notFoundError('Workspace not found.');
    }
    return workspaceRepository.updateWorkspace(workspaceId, name);
  }

  // NOTE: get workspaces for user
  async getWorkspacesForUser(userId: string): Promise<Workspace[]> {
    return workspaceRepository.getWorkspacesForUser(userId);
  }
}

export const workspaceService = new WorkspaceService();
