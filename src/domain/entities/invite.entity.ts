import { WorkspaceRole } from 'prisma-types/enums'
import { BaseEntity } from 'src/domain/entities/base.entity'

export type InviteEntity = BaseEntity & {
  userEmail: string
  workspaceId: string
  userRole: WorkspaceRole
}
