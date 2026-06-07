import z from 'zod';

export const workspaceSchema = z.object({
  name: z
    .string('Workspace name is required.')
    .min(2, 'Workspace name must be at least 2 characters.')
    .max(50, 'Workspace name must not exceed 50 characters.'),
});

export type WorkspaceInput = z.infer<typeof workspaceSchema>;
