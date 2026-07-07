import { IsIn, IsOptional, IsString } from 'class-validator'
import { WorkspaceRole } from 'prisma-types/enums'

export class InviteUserToWorkspaceDto {
  @IsOptional()
  @IsString()
  userEmail!: string

  @IsIn([WorkspaceRole.MEMBER, WorkspaceRole.ADMIN])
  userRole!: 'MEMBER' | 'ADMIN'
}
