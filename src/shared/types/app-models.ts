export enum WorkspaceRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

export enum AssetType {
  LAPTOP = 'LAPTOP',
  MONITOR = 'MONITOR',
  KEYBOARD = 'KEYBOARD',
  MOUSE = 'MOUSE',
  HEADPHONE = 'HEADPHONE',
  OTHER = 'OTHER',
}

export enum AssetStatus {
  IN_STORAGE = 'IN_STORAGE',
  ASSIGNED = 'ASSIGNED',
  UNDER_REPAIR = 'UNDER_REPAIR',
  RETIRED = 'RETIRED',
}

export type User = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SanitizedUser = Omit<User, 'passwordHash'>;

export type Workspace = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type WorkspaceMember = {
  id: string;
  workspaceId: string;
  userId: string;
  role: WorkspaceRole;
  createdAt: Date;
};

export type Asset = {
  id: string;
  workspaceId: string;
  name: string;
  serialNumber: string;
  type: AssetType;
  status: AssetStatus;
  assignedToId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type AssignmentHistory = {
  id: string;
  workspaceId: string;
  assetId: string;
  assignedToId: string | null;
  assignedById: string;
  action: string;
  notes: string | null;
  createdAt: Date;
};
