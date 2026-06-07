import { Router } from 'express';
import { validate } from '../../shared/middlewares/validate.js';
import { loginSchema, registerSchema } from './auth.schema.js';
import { authController } from './auth.controller.js';
import { requireAuth } from '../../shared/middlewares/require-auth.js';

export const authRouter = Router();

// NOTE: register route
authRouter.post(
  '/register',
  validate({ body: registerSchema }),
  authController.register.bind(authController),
);

// NOTE: login route
authRouter.post(
  '/login',
  validate({ body: loginSchema }),
  authController.login.bind(authController),
);

// NOTE: logout route
authRouter.post(
  '/logout',
  requireAuth,
  authController.logout.bind(authController),
);

// NOTE: get current user route
authRouter.get('/me', requireAuth, authController.me.bind(authController));
