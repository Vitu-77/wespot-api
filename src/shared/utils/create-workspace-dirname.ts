import { WorkspaceEntity } from "src/domain/entities/workspace.entity";
import { S3_WORKSPACE_FOLDERS } from "src/shared/constants/s3-workspace-folders";
import { createSlug } from "src/shared/utils/create-slug";

export function createWorkspaceDirname(
  workspace: WorkspaceEntity,
  folder?: keyof typeof S3_WORKSPACE_FOLDERS,
) {
  const slug = createSlug(workspace.name ?? null);
  return `${slug}__${workspace.id}${folder ? `/${S3_WORKSPACE_FOLDERS[folder]}` : ""}`;
}
