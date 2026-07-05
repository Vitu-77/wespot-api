import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ErrorCodes } from 'src/domain/exceptions/error-codes.enum';
import { InviteRepository } from 'src/infra/database/repositories/invite-repository/invite.repository';
import { UserRepository } from 'src/infra/database/repositories/user-repository/user.repository';
import { WorkspaceRepository } from 'src/infra/database/repositories/workspace-repository/workspace.repository';
import { AddUserToWorkspaceWithInviteDto } from 'src/modules/users/services/add-user-with-invite/add-user-with-invite.dto';

@Injectable()
export class AddUserToWorkspaceWithInviteService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly inviteRepository: InviteRepository,
    private readonly workspaceRepository: WorkspaceRepository,
  ) {}

  async execute({ inviteId }: AddUserToWorkspaceWithInviteDto) {
    const invite = await this.inviteRepository.getById(inviteId);

    if (!invite) {
      throw new BadRequestException('Invite expired', {
        description: ErrorCodes.INVITE_EXPIRED,
      });
    }

    const user = await this.userRepository.getByEmail(invite.userEmail);

    if (!user) {
      throw new NotFoundException(`User not found`, {
        description: ErrorCodes.USER_NOT_FOUND,
      });
    }

    if (user.email !== invite.userEmail) {
      throw new UnauthorizedException('Invite belongs to another user', {
        description: ErrorCodes.INVITE_BELONGS_TO_ANOTHER_USER,
      });
    }

    if (user.workspaces.some((w) => w.workspace.id === invite.workspaceId)) {
      throw new BadRequestException('User already in workspace', {
        description: ErrorCodes.USER_ALREADY_IN_WORKSPACE,
      });
    }

    const membershipment = await this.workspaceRepository.createMember({
      userId: user.id,
      workspaceId: invite.workspaceId,
      role: invite.userRole,
    });

    await this.inviteRepository.update(inviteId, { status: 'ACCEPTED' });

    return {
      ...user,
      workspaces: [
        ...user.workspaces,
        {
          role: membershipment.role,
          workspace: membershipment.workspace,
        },
      ],
    };
  }
}
