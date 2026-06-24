import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkspaceRole } from 'prisma-types/enums';
import { UserEntity } from 'src/domain/entities/user.entity';
import { ErrorCodes } from 'src/domain/exceptions/error-codes.enum';
import { CreateMembershipmentRepository } from 'src/modules/accounts/repositories/create-membershipment.repository';
import { CreateWorkspaceRepository } from 'src/modules/accounts/repositories/create-workspace.repository';
import { GetUserByIdRepository } from 'src/modules/accounts/repositories/get-user-by-id.repository';
import { CompleteOnboardingDto } from 'src/modules/accounts/services/complete-onboarding/create-account.dto';

@Injectable()
export class CompleteOnboardingService {
  constructor(
    private readonly getUserByIdRepository: GetUserByIdRepository,
    private readonly createWorkspaceRepository: CreateWorkspaceRepository,
    private readonly createMembershipmentRepository: CreateMembershipmentRepository,
  ) {}

  // TODO: Validar onboarding
  // TODO: Criar validador de fingerprint

  async execute({
    userId,
    workspaceName,
    workspaceType,
  }: CompleteOnboardingDto): Promise<UserEntity> {
    const user = await this.getUserByIdRepository.execute(userId);

    if (!user) {
      throw new NotFoundException('User not found', {
        description: ErrorCodes.USER_NOT_FOUND,
      });
    }

    const workspace = await this.createWorkspaceRepository.execute({
      name: workspaceName,
      type: workspaceType,
    });

    const membershipment = await this.createMembershipmentRepository.execute({
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
