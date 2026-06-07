export type AppErrorCode =
  | 'VALIDATION_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT';

export class AppError extends Error {
  readonly statusCode: number;
  readonly code: AppErrorCode;
  readonly details?: unknown;

  constructor(
    message: string,
    statusCode: number,
    code: AppErrorCode,
    details?: unknown,
  ) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export const createAppError = ({
  message,
  statusCode,
  code,
  details,
}: {
  message: string;
  statusCode: number;
  code: AppErrorCode;
  details?: unknown;
}) => {
  return new AppError(message, statusCode, code, details);
};

export const validationError = (message: string, details?: unknown) => {
  return createAppError({
    message,
    statusCode: 400,
    code: 'VALIDATION_ERROR',
    details,
  });
};

export const unauthorizedError = () => {
  return createAppError({
    message: 'Unauthorized',
    statusCode: 401,
    code: 'UNAUTHORIZED',
  });
};

export const forbiddenError = () => {
  return createAppError({
    message: 'Forbidden',
    statusCode: 403,
    code: 'FORBIDDEN',
  });
};

export const notFoundError = () => {
  return createAppError({
    message: 'Not Found',
    statusCode: 404,
    code: 'NOT_FOUND',
  });
};

export const conflictError = () => {
  return createAppError({
    message: 'Conflict',
    statusCode: 409,
    code: 'CONFLICT',
  });
};

export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError;
};
