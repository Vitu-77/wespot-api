import { WorkspaceRole } from 'prisma-types/enums'
import { BaseEntity } from 'src/domain/entities/base.entity'
import { UserEntity } from 'src/domain/entities/user.entity'
import { WorkspaceEntity } from 'src/domain/entities/workspace.entity'

export type WorkspaceMemberEntity = Omit<BaseEntity, 'id'> & {
  role: WorkspaceRole

  userId: string
  user?: UserEntity

  workspaceId: string
  workspace?: WorkspaceEntity
}
