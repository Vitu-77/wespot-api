/** biome-ignore-all lint/suspicious/noExplicitAny: requires any */
/** biome-ignore-all lint/style/noNamespace: - */

import { WorkspaceUserEntity } from "src/domain/entities/workspace-user.entity";

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

  export interface MulterFile {
    /** Nome do campo no multipart/form-data */
    fieldname: string;

    /** Nome original do arquivo */
    originalname: string;

    /** Encoding do arquivo */
    encoding: string;

    /** MIME Type */
    mimetype: string;

    /** Tamanho em bytes */
    size: number;

    /** Buffer do arquivo (quando usando memoryStorage) */
    buffer: Buffer;

    /** Stream de leitura */
    stream: NodeJS.ReadableStream;

    /** Pasta de destino (diskStorage) */
    destination?: string;

    /** Nome do arquivo salvo (diskStorage) */
    filename?: string;

    /** Caminho completo (diskStorage) */
    path?: string;
  }
}
