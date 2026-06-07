import { Router } from 'express';
import { requireAuth } from '../../shared/middlewares/require-auth.js';
import { workspaceController } from './workspace.controller.js';
import { requireWorkspaceMember } from '../../shared/middlewares/requireWorkspacememeber.js';
import { requireWorkspaceRole } from '../../shared/middlewares/requireWorkspaceRole.js';
import { validate } from '../../shared/middlewares/validate.js';
import { updateWorkspaceSchema } from './workspace.schema.js';

export const workspaceRouter = Router();

workspaceRouter.use(requireAuth);

// NOTE: list workspaces
workspaceRouter.get('/', workspaceController.list.bind(workspaceController));

// NOTE: get single workspace
workspaceRouter.get(
  '/:workspaceId',
  requireWorkspaceMember,
  workspaceController.get.bind(workspaceController),
);

// NOTE: update workspace
workspaceRouter.put(
  '/:workspaceId',
  requireWorkspaceMember,
  requireWorkspaceRole(['ADMIN']),
  validate({ body: updateWorkspaceSchema }),
  workspaceController.update.bind(workspaceController),
);

// NOTE: delete workspace
workspaceRouter.delete(
  '/:workspaceId',
  requireWorkspaceMember,
  requireWorkspaceRole(['ADMIN']),
  workspaceController.delete.bind(workspaceController),
);
