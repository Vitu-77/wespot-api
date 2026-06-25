export {};

declare global {
  type RequestContext = {
    userId: string;
    workspaceId?: string | null;
  };

  namespace Express {
    interface Request {
      ctx: RequestContext;
    }
  }
}
