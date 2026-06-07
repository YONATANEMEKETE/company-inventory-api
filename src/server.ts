import { app } from './app.js';

import { config } from './shared/configs/env.js';
import { logger } from './shared/utils/logger.js';

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
  logger.info(
    `Server is running on port ${PORT} in ${config.NODE_ENV} mode: http://localhost:${PORT}`,
  );
});
