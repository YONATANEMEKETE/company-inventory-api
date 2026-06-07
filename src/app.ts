import express from 'express';
import { requestLogger } from './shared/middlewares/requets-logger.js';
import { notFoundHandler } from './shared/middlewares/notfound-handler.js';
import { errorHandler } from './shared/middlewares/error-handler.js';

export const app = express();

app.use(requestLogger);
app.use(express.json());

app.get('/health', (req, res) => {
  res.send('Server is running');
});

app.use(notFoundHandler);
app.use(errorHandler);
