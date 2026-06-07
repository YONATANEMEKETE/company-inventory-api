import { Response } from 'express';

export interface ErrorResponseOptions {
  res: Response;
  status: number;
  message: string;
  code: string;
  details?: unknown;
}

export interface PaginationMetadata {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface SuccessResponseOptions<T> {
  res: Response;
  status?: number;
  data: T;
}

export interface SuccessListResponseOptions<T> {
  res: Response;
  status?: number;
  items: T[];
  metadata?: PaginationMetadata;
}

/**
 * Sends a structured, consistent error response to the client.
 * Envelope: { error: { message, code, details } }
 */
export function sendErrorResponse({
  res,
  status,
  message,
  code,
  details,
}: ErrorResponseOptions): Response {
  return res.status(status).json({
    error: {
      message,
      code,
      details: details ?? null,
    },
  });
}

/**
 * Sends a structured, consistent success response to the client.
 *
 * Single record: { data: T }
 * List records:   { data: { items: T[], metadata: PaginationMetadata | null } }
 */
export function sendSuccessResponse<T>(
  options: SuccessResponseOptions<T> | SuccessListResponseOptions<T>,
): Response {
  const status = options.status ?? 200;
  const res = options.res;

  // Type guard using 'items' property to detect list response
  if ('items' in options) {
    return res.status(status).json({
      data: {
        items: options.items,
        metadata: options.metadata ?? null,
      },
    });
  }

  // Otherwise, default to single record response
  return res.status(status).json({
    data: options.data,
  });
}
