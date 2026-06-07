import express from 'express';
import { requestLogger } from './shared/middlewares/requets-logger.js';

export const app = express();

app.use(requestLogger);

app.get('/health', (req, res) => {
  res.send('Server is running');
});
