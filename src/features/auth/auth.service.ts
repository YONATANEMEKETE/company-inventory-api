import { conflictError } from '../../shared/errors/errors.js';
import { hashPassword } from '../../shared/utils/password.js';
import { sanitizeUser } from '../../shared/utils/sanitize-user.js';
import { authRepository } from './auth.repostitory.js';
import { RegisterInput } from './auth.schema.js';

export class AuthService {
  async register(input: RegisterInput) {
    // 1. Check if email is already taken
    const existingUser = await authRepository.findByEmail(input.email);

    if (existingUser) {
      throw conflictError('Email is already registered');
    }

    // TODO: check if there is already a workspace with the name and responde with change a name conflict. and finish the workspace creation and memebership creation

    // 2. Hash the password
    const passwordHash = await hashPassword(input.password);

    // 3. Create the user record
    const user = await authRepository.create({
      email: input.email,
      passwordHash,
    });

    // 4. Sanitize and return the user object
    return sanitizeUser(user);
  }
}

export const authService = new AuthService();
