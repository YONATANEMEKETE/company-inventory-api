import { NextFunction, Response, Request } from 'express';
import { LoginInput, RegisterInput } from './auth.schema.js';
import { authService } from './auth.service.js';
import { sendSuccessResponse } from '../../shared/utils/response.js';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      // req.body is already validated and typed by our middleware
      const validatedData = req.body as RegisterInput;

      const user = await authService.register(validatedData);
      req.log.info({ user }, `User ${user.id} registered successfully`);

      // Establish session
      req.session.userId = user.id;

      sendSuccessResponse({
        res,
        status: 201,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  // login controller
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = req.body as LoginInput;
      const user = await authService.login(validatedData);
      req.log.info({ user }, `User ${user.id} logged in successfully`);

      req.session.userId = user.id;

      sendSuccessResponse({
        res,
        status: 200,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      // Clear the session cookie on the client browser
      res.clearCookie('sid');

      // Return 204 No Content (matching our API contract)
      res.sendStatus(204);
    });
  }
}

export const authController = new AuthController();
