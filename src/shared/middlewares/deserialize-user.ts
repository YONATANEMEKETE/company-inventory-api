import { NextFunction, Request, Response } from 'express';
import { authRepository } from '../../features/auth/auth.repostitory.js';
import { sanitizeUser } from '../utils/sanitize-user.js';
import { unauthorizedError } from '../errors/errors.js';

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.session.userId;

  if (userId) {
    try {
      const user = await authRepository.findById(userId);

      if (user) {
        req.user = sanitizeUser(user);
      }
    } catch (error) {
      req.log.info({ error }, 'Failed to deserialize user');
    }
  }

  next();
};
