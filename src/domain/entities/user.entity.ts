import { AuthProvider, WorkspaceRole } from 'prisma-types/enums';
import { BaseEntity } from 'src/domain/entities/base.entity';
import { WorkspaceEntity } from 'src/domain/entities/workspace.entity';

type Membershipment = {
  role: WorkspaceRole;
  workspace: WorkspaceEntity;
};

export type UserEntity = BaseEntity & {
  name: string;
  email: string;
  password: string | null;
  avatarUrl: string | null;
  authProvider: AuthProvider;
  fingerprint: string;

  workspaces: Membershipment[];
};
