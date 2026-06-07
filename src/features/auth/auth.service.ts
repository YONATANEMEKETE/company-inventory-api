import {
  conflictError,
  unauthorizedError,
} from '../../shared/errors/errors.js';
import { SanitizedUser, User } from '../../shared/types/app-models.js';
import { hashPassword, verifyPassword } from '../../shared/utils/password.js';
import { sanitizeUser } from '../../shared/utils/sanitize-user.js';
import { workspaceRepository } from '../workspace/workspace.repository.js';
import { authRepository } from './auth.repostitory.js';
import { LoginInput, RegisterInput } from './auth.schema.js';

export class AuthService {
  async register(input: RegisterInput) {
    // 1. Check if email is already taken
    const existingUser = await authRepository.findByEmail(input.email);

    if (existingUser) {
      throw conflictError('Email is already registered');
    }

    // 2. Hash the password
    const passwordHash = await hashPassword(input.password);

    const user = await authRepository.registerNewUser({
      email: input.email,
      passwordHash,
      workspaceName: input.workspaceName,
    });

    // 4. Sanitize and return the user object
    return sanitizeUser(user);
  }

  // NOTE: login
  // login: service
  async login(input: LoginInput): Promise<SanitizedUser> {
    // 1. Find user by email using the Repository
    const user = await authRepository.findByEmail(input.email);

    // 2. If user doesn't exist, throw generic unauthorized error (security hardening)
    if (!user) {
      throw unauthorizedError('Invalid email or password');
    }

    // 3. Verify the password hash
    const isValidPassword = await verifyPassword(
      user.passwordHash,
      input.password,
    );
    if (!isValidPassword) {
      throw unauthorizedError('Invalid email or password');
    }

    // 4. Sanitize and return the user
    return sanitizeUser(user);
  }
}

export const authService = new AuthService();
