import type { User } from '../../generated/prisma/client.js';
import { SanitizedUser } from '../types/app-models.js';

// NOTE: omit password and createdAt, updatedAt
export const sanitizeUser = (user: User): SanitizedUser => {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
};
