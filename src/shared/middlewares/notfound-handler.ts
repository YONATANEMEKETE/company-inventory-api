import { RequestHandler } from 'express';
import { notFoundError } from '../errors/errors.js';

export const notFoundHandler: RequestHandler = (req, res, next) => {
  next(notFoundError(`Route ${req.method} ${req.originalUrl} not found`));
};
