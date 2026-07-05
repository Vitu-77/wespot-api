import { WorkspaceUserEntity } from 'src/domain/entities/workspace-user.entity';

export {};

declare global {
  type RequestContext = {
    user: WorkspaceUserEntity;
    workspaceId?: string | null;
  };

  type InjectWorkspaceId<T> = T & { workspaceId: string };
  type InjectUserId<T> = T & { userId: string };
  type InjectLoggedUser<T> = T & { loggedUser: WorkspaceUserEntity };

  namespace Express {
    interface Request {
      ctx: RequestContext;
    }
  }
}
