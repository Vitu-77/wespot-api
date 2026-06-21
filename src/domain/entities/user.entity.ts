import { WorkspaceRole } from 'prisma-types/enums';
import { BaseEntity } from 'src/domain/entities/base.entity';

export type UserEntity = BaseEntity & {
  name: string;
  email: string;
  password: string | null;
  avatarUrl: string | null;
  role: WorkspaceRole;

  workspaceId: string;
  // workspace:

  authAccounts: [];
};
