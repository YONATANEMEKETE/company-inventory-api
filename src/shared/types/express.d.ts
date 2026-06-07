import 'express-session';
import { SanitizedUser, WorkspaceMember, WorkspaceRole } from './app-models.ts';

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: SanitizedUser;
      membership?: WorkspaceMember;
    }
  }
}
