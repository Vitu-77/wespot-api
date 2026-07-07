import { WorkspaceRole } from 'prisma-types/enums'
import { UserEntity } from 'src/domain/entities/user.entity'

export type WorkspaceUserEntity = Omit<UserEntity, 'workspaces'> & {
  role: WorkspaceRole
}
