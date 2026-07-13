import { WorkspaceEntity } from "src/domain/entities/workspace.entity";
import { createSlug } from "src/shared/utils/create-slug";

export function createWorkspaceDirname(workspace: WorkspaceEntity) {
  const slug = createSlug(workspace.name ?? null);
  return `${slug}__${workspace.id}`;
}
