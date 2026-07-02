import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorCodes } from 'src/domain/exceptions/error-codes.enum';
import { env } from 'src/env';
import { InviteRepository } from 'src/infra/database/repositories/invite-repository/invite.repository';
import { UserRepository } from 'src/infra/database/repositories/user-repository/user.repository';
import { WorkspaceRepository } from 'src/infra/database/repositories/workspace-repository/workspace.repository';
import { EmailService } from 'src/infra/email/email.service';
import { createInviteEmail } from 'src/infra/email/templates/invite-template';
import { InviteUserToWorkspaceDto } from 'src/modules/workspaces/services/invite-user/invite-user.dto';

@Injectable()
export class InviteUserToWorkspaceService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly inviteRepository: InviteRepository,
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly emailService: EmailService,
  ) {}

  async execute(
    payload: InjectWorkspaceId<InviteUserToWorkspaceDto>,
  ): Promise<any> {
    const workspace = await this.workspaceRepository.getById(
      payload.workspaceId,
    );

    if (!workspace) {
      throw new NotFoundException('Workspace not found', {
        description: ErrorCodes.WORKSPACE_NOT_FOUND,
      });
    }

    const user = await this.userRepository.getByEmail(payload.userEmail);

    if (!user) {
      throw new NotFoundException('user not found', {
        description: ErrorCodes.USER_NOT_FOUND,
      });
    }

    await this.inviteRepository.deleteByUserEmail(payload.userEmail);
    const invite = await this.inviteRepository.create({
      ...payload,
      status: 'PENDING',
    });

    await this.emailService.send({
      title: `WeSpot | Convite para entrar no workspace ${workspace.name ?? ''}`,
      to: [payload.userEmail],
      fromMail: env.SUPPORT_EMAIL_SENDER,
      fromName: 'WeSpot',
      content: createInviteEmail({
        inviteId: invite.id,
        workspaceName: workspace.name,
      }),
    });

    return { mailSent: true };
  }
}
