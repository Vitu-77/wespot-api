import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { WorkspaceRole } from "prisma-types/enums";
import { UserEntity } from "src/domain/entities/user.entity";
import { ErrorCodes } from "src/domain/exceptions/error-codes.enum";
import { UserRepository } from "src/infra/database/repositories/user-repository/user.repository";
import { WorkspaceRepository } from "src/infra/database/repositories/workspace-repository/workspace.repository";
import { CompleteOnboardingDto } from "src/modules/accounts/signup/services/complete-onboarding/create-account.dto";
import { CreateWorkspaceUseCase } from "src/modules/accounts/signup/usecases/create-workspace/create-workspace.usecase";

@Injectable()
export class CompleteOnboardingService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly createWorkspaceUseCase: CreateWorkspaceUseCase,
  ) {}

  async execute({
    userId,
    workspaceName,
    workspaceType,
  }: CompleteOnboardingDto): Promise<UserEntity> {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new NotFoundException("User not found", {
        description: ErrorCodes.USER_NOT_FOUND,
      });
    }

    if (user.workspaces.length) {
      throw new BadRequestException("Onboarding already done for this user", {
        description: ErrorCodes.USER_HAS_ONBOARDING_COMPLETED,
      });
    }

    const workspace = await this.createWorkspaceUseCase.execute({
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
