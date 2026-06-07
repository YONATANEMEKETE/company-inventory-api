import { Router } from 'express';
import { validate } from '../../shared/middlewares/validate.js';
import { loginSchema, registerSchema } from './auth.schema.js';
import { authController } from './auth.controller.js';

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
