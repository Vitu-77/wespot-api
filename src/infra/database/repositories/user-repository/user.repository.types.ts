import { WorkspaceRole } from 'prisma-types/enums'

export type UserRepositoryListParams = {
  id?: string
  workspaceId?: string
  name?: string
  email?: string
  role?: WorkspaceRole
  pageNumber: number
  pageSize: number
}
