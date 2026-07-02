import { WorkspaceUserEntity } from 'src/domain/entities/workspace-user.entity';

export {};

declare global {
  type RequestContext = {
    user: WorkspaceUserEntity;
    workspaceId?: string | null;
  };

  type InjectWorkspaceId<T> = T & { workspaceId: string };

  namespace Express {
    interface Request {
      ctx: RequestContext;
    }
  }
}
