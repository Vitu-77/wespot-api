import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from 'src/domain/entities/user.entity';
import { ErrorCodes } from 'src/domain/exceptions/error-codes.enum';
import { ArgonService } from 'src/infra/argon/argon.service';
import { UserRepository } from 'src/infra/database/repositories/user-repository/user.repository';
import { WorkspaceRepository } from 'src/infra/database/repositories/workspace-repository/workspace.repository';
import { CreateWorkspaceUserDto } from 'src/modules/users/services/create-user/create-user.dto';

@Injectable()
export class CreateWorkspaceUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly argonService: ArgonService,
  ) {}

  async execute(
    payload: InjectWorkspaceId<CreateWorkspaceUserDto>,
  ): Promise<UserEntity> {
    const user = await this.userRepository.getByEmail(payload.email);
    const workspace = await this.workspaceRepository.getById(
      payload.workspaceId,
    );

    if (!workspace) {
      throw new NotFoundException('Workspace not found', {
        description: ErrorCodes.WORKSPACE_NOT_FOUND,
      });
    }

    if (user) {
      const isInCurrentWorkspace = user.workspaces.some(
        (w) => w.workspace.id === payload.workspaceId,
      );

      if (isInCurrentWorkspace) {
        throw new ConflictException('User already in current workspace', {
          description: ErrorCodes.USER_ALREADY_IN_WORKSPACE,
        });
      }

      throw new ConflictException('User is in another workspace', {
        description: ErrorCodes.USER_IN_OTHER_WORKSPACES,
      });
    }

    const newUser = await this.userRepository.create({
      ...payload,
      emailValidated: true,
      authProvider: 'EMAIL',
      password: await this.argonService.hashString(payload.password),
      fingerprint: 'FROM_ADMIN',
    });

    const membershipment = await this.workspaceRepository.createMember({
      userId: newUser.id,
      workspaceId: payload.workspaceId,
      role: payload.role,
    });

    return {
      ...newUser,
      workspaces: [
        {
          role: membershipment.role,
          workspace,
        },
      ],
    };
  }
}
