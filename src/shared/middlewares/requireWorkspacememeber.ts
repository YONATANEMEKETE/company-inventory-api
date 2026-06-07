import { NextFunction, Request, Response } from 'express';
import {
  forbiddenError,
  unauthorizedError,
  validationError,
} from '../errors/errors.js';
import { workspaceRepository } from '../../features/workspace/workspace.repository.js';

export const requireWorkspaceMember = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // 1. Ensure the user is authenticated (defensive guard)
    if (!req.user) {
      throw unauthorizedError('Authentication required');
    }
    // 2. Extract the workspaceId from URL params
    const { workspaceId } = req.params;
    if (!workspaceId) {
      throw validationError('Workspace ID is required');
    }
    // 3. Lookup the membership in the database
    const membership = await workspaceRepository.findMembership(
      req.user.id,
      workspaceId as string,
    );
    // 4. If no membership exists, reject with 403 Forbidden
    if (!membership) {
      throw forbiddenError('You are not a member of this workspace');
    }
    // 5. Attach the membership details to the request context
    req.membership = membership;
    next();
  } catch (error) {
    next(error);
  }
};
