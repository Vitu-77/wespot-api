import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorCodes } from 'src/domain/exceptions/error-codes.enum';
import { SpotRepository } from 'src/infra/database/repositories/spot.repository';
import { UserRepository } from 'src/infra/database/repositories/user.repository';
import { DeleteSpotsDto } from 'src/modules/spots/services/delete-spots/delete-spots.dto';

type Params = DeleteSpotsDto & {
  workspaceId: string;
  userId: string;
};

@Injectable()
export class DeleteSpotsService {
  constructor(
    private readonly spotsRepository: SpotRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute({ ids, userId, workspaceId }: Params) {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new NotFoundException('User not found', {
        description: ErrorCodes.USER_NOT_FOUND,
      });
    }

    // TODO: incluir validação de workspoaceId + user.role

    const { items: spots } = await this.spotsRepository.list({
      ids,
      pageNumber: 1,
      pageSize: ids.length,
    });

    console.log({ spots, workspaceId });

    // TODO: Incluir validação
    // if (spots.some((spot) => spot.workspaceId !== session.user.workspaceId)) {
    //   throw new ForbiddenException('This spots belongs to another workspace');
    // }

    return this.spotsRepository.deleteMany(ids);
  }
}
