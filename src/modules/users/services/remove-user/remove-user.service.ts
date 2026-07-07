import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ErrorCodes } from 'src/domain/exceptions/error-codes.enum'
import { UserRepository } from 'src/infra/database/repositories/user-repository/user.repository'
import { WorkspaceRepository } from 'src/infra/database/repositories/workspace-repository/workspace.repository'
import { CreateNotificationService } from 'src/modules/notifications/services/create-notification/create-notification.service'
import { RemoveUserFromWorkspaceDto } from 'src/modules/users/services/remove-user/remove-user.dto'

@Injectable()
export class RemoveUserFromWorkspaceService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly createNotificationService: CreateNotificationService,
  ) {}

  async execute({
    loggedUser,
    userId,
    workspaceId,
  }: InjectLoggedUser<RemoveUserFromWorkspaceDto>) {
    const workspace = await this.workspaceRepository.getById(workspaceId)

    if (!workspace) {
      throw new NotFoundException('Workspace not found', {
        description: ErrorCodes.WORKSPACE_NOT_FOUND,
      })
    }

    const user = await this.userRepository.getById(userId)

    if (!user) {
      throw new NotFoundException('User not found', {
        description: ErrorCodes.USER_NOT_FOUND,
      })
    }

    const membeshipment = user.workspaces.find(
      (w) => w.workspace.id === workspaceId,
    )

    if (!membeshipment) {
      throw new BadRequestException('User do not belongs to workspace', {
        description: ErrorCodes.USER_DO_NOT_BELONGS_TO_WORKSPACE,
      })
    }

    if (membeshipment.role === 'OWNER') {
      throw new BadRequestException('Owner cannot be removed from workspace', {
        description: ErrorCodes.OWNERS_USERS_CANNOT_BE_REMOVED,
      })
    }

    await this.workspaceRepository.deleteMember({ userId, workspaceId })
    await this.createNotificationService.execute({
      userIds: [userId],
      title: 'Você foi removido de um workspace',
      content: workspace.name
        ? `Seu acesso ao workspace "${workspace.name}" foi removido por ${loggedUser.name}.`
        : `Seu acesso a um workspace foi removido por ${loggedUser.name}.`,
    })

    return { success: true }
  }
}
