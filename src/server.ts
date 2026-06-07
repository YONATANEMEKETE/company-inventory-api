import { app } from './app.js';

import { config } from './shared/configs/env.js';

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${config.NODE_ENV} mode`);
});
