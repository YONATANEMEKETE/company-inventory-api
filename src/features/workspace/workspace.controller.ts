import { NextFunction, Request, Response } from 'express';
import { workspaceService } from './workspace.service.js';
import { sendSuccessResponse } from '../../shared/utils/response.js';

export class WorkspaceController {
  // NOTE: get single by Id
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { workspaceId } = req.params;

      const workspace = await workspaceService.getWorkspaceById(
        workspaceId as string,
      );

      sendSuccessResponse({
        status: 200,
        data: workspace,
        res,
      });
    } catch (error) {
      next(error);
    }
  }

  // NOTE: list workspaces for a user
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;

      const workspaces = await workspaceService.getWorkspacesForUser(
        userId as string,
      );

      sendSuccessResponse({
        status: 200,
        data: workspaces,
        res,
      });
    } catch (error) {
      next(error);
    }
  }

  // NOTE: update workspace
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { workspaceId } = req.params;
      const { name } = req.body;

      const workspace = await workspaceService.updateWorkspace(
        workspaceId as string,
        name,
      );

      sendSuccessResponse({
        status: 200,
        data: workspace,
        res,
      });
    } catch (error) {
      next(error);
    }
  }

  // NOTE: delete workspace
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { workspaceId } = req.params;

      await workspaceService.deleteWorkspace(workspaceId as string);

      sendSuccessResponse({
        status: 204,
        data: null,
        res,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const workspaceController = new WorkspaceController();
