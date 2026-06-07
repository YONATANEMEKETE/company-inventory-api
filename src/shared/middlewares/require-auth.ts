import { NextFunction, Request, Response } from 'express';
import { unauthorizedError } from '../errors/errors.js';

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (!req.user) {
    throw unauthorizedError('You must be logged in first');
  }
  next();
}
