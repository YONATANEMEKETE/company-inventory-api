import z from 'zod';
import { WorkspaceRole } from '../../shared/types/app-models.js';

export const workspaceSchema = z.object({
  name: z
    .string()
    .min(1, 'workpsace name is requiered.')
    .min(2, 'Workspace name must be at least 2 characters.')
    .max(50, 'Workspace name must not exceed 50 characters.'),
});

export type WorkspaceInput = z.infer<typeof workspaceSchema>;

// NOTE: memeber
export const workspaceMemberSchema = z.object({
  workspaceId: z.string().min(1, 'workspace is requiered.'),
  userId: z.string().min(1, 'user is requiered.'),
  role: z.enum(['ADMIN', 'MEMBER'], {
    message: 'Invalid role.',
  }),
});

export type WorkspaceMemberInput = z.infer<typeof workspaceMemberSchema>;
