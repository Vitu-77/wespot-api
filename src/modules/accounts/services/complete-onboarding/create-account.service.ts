import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { WorkspaceRole } from 'prisma-types/enums';
import { UserEntity } from 'src/domain/entities/user.entity';
import { ErrorCodes } from 'src/domain/exceptions/error-codes.enum';
import { UserRepository } from 'src/infra/database/repositories/user-repository/user.repository';
import { WorkspaceRepository } from 'src/infra/database/repositories/workspace-repository/workspace.repository';
import { CompleteOnboardingDto } from 'src/modules/accounts/services/complete-onboarding/create-account.dto';
import { CreateWorkspaceService } from 'src/modules/workspaces/services/create-workspace/create-workspace.service';

@Injectable()
export class CompleteOnboardingService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly createWorkspaceService: CreateWorkspaceService,
  ) {}

  async execute({
    userId,
    workspaceName,
    workspaceType,
  }: CompleteOnboardingDto): Promise<UserEntity> {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new NotFoundException('User not found', {
        description: ErrorCodes.USER_NOT_FOUND,
      });
    }

    if (user.workspaces.length) {
      throw new BadRequestException('Onboarding already done for this user', {
        description: ErrorCodes.USER_HAS_ONBOARDING_COMPLETED,
      });
    }

    const workspace = await this.createWorkspaceService.execute({
      name: workspaceName,
      type: workspaceType,
    });

    const membershipment = await this.workspaceRepository.createMember({
      userId,
      workspaceId: workspace.id,
      role: WorkspaceRole.OWNER,
    });

    return {
      ...user,
      workspaces: [
        {
          role: membershipment.role,
          workspace,
        },
      ],
    };
  }
}
