import { conflictError } from '../../shared/errors/errors.js';
import { hashPassword } from '../../shared/utils/password.js';
import { sanitizeUser } from '../../shared/utils/sanitize-user.js';
import { workspaceRepository } from '../workspace/workspace.repository.js';
import { authRepository } from './auth.repostitory.js';
import { RegisterInput } from './auth.schema.js';

export class AuthService {
  async register(input: RegisterInput) {
    // 1. Check if email is already taken
    const existingUser = await authRepository.findByEmail(input.email);

    if (existingUser) {
      throw conflictError('Email is already registered');
    }

    // 2. Hash the password
    const passwordHash = await hashPassword(input.password);

    // NOTE: using transaction to create user, workspace and workspacemember

    const user = await authRepository.registerNewUser({
      email: input.email,
      passwordHash,
      workspaceName: input.workspaceName,
    });

    // 4. Sanitize and return the user object
    return sanitizeUser(user);
  }
}

export const authService = new AuthService();
