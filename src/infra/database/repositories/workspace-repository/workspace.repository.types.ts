import { WorkspaceRole } from 'prisma-types/enums'

export type WorkspaceRepositoryCreateMemberParams = {
  userId: string
  workspaceId: string
  role: WorkspaceRole
}

export type WorkspaceRepositoryDeleteMemberParams = Pick<
  WorkspaceRepositoryCreateMemberParams,
  'userId' | 'workspaceId'
>
