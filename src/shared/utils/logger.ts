import pino from 'pino';
import { config } from '../configs/env.js';

export const logger = pino({
  level: config.LOG_LEVEL,
  redact: [
    'req.headers.authorization',
    'req.headers.cookie',
    'body.password',
    'body.token',
  ],
  transport:
    config.NODE_ENV === 'development' ? { target: 'pino-pretty' } : undefined,
});
