import { SessionEntity } from 'src/domain/entities/session.entity';

export {};

declare global {
  type RequestContext = {
    session?: SessionEntity | null;
  };

  namespace Express {
    interface Request {
      context: RequestContext;
    }
  }
}
