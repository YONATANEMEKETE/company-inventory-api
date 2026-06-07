import { NextFunction, Request, Response } from 'express';
import { forbiddenError } from '../errors/errors.js';
import { WorkspaceRole } from '../types/app-models.js';

export const requireWorkspaceRole = (allowedRoles: WorkspaceRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // 1. Ensure the membership context was already populated by requireWorkspaceMember
    if (!req.membership) {
      throw forbiddenError(
        'Workspace membership check is required before verifying roles',
      );
    }
    // 2. Check if the user's role is in the list of allowed roles
    if (!allowedRoles.includes(req.membership.role)) {
      throw forbiddenError('You do not have permission to perform this action');
    }
    next();
  };
};
