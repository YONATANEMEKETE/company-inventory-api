import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { isAppError } from '../errors/errors.js';
import { sendErrorResponse } from '../utils/response.js';

export const errorhandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    const details = err.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    req.log.warn({ err }, 'validation failed');
    sendErrorResponse({
      res,
      status: 400,
      message: 'Invalid request data',
      code: 'VALIDATION_ERROR',
      details,
    });
    return;
  }

  const appError = isAppError(err) ? err : undefined;
  const statusCode = appError ? appError.statusCode : 500;
  const code = appError ? appError.code : 'INTERNAL_SERVER_ERROR';
  const message = appError ? appError.message : 'An unexpected error occurred';
  const details = appError?.details;

  req.log.error({ err }, 'request failed');

  sendErrorResponse({ res, status: statusCode, message, code, details });
};
