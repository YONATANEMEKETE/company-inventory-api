import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().trim().toLowerCase().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  workspaceName: z
    .string('Workspace name is Required.')
    .min(2, 'Workspace name must be at least 2 characters long.')
    .max(50, 'Workspace name must not exceed 50 characters.'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
