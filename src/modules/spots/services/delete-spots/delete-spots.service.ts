import { ForbiddenException, Injectable } from '@nestjs/common';
import { SessionEntity } from 'src/domain/entities/session.entity';
import { DeleteSpotsRepository } from 'src/modules/spots/repositories/delete-spots.repository';
import { ListSpotsRepository } from 'src/modules/spots/repositories/list-spots.repository';
import { DeleteSpotsDto } from 'src/modules/spots/services/delete-spots/delete-spots.dto';

type Params = DeleteSpotsDto & {
  session: SessionEntity;
};

@Injectable()
export class DeleteSpotsService {
  constructor(
    private readonly deleteSpotsRepository: DeleteSpotsRepository,
    private readonly listSpotsRepository: ListSpotsRepository,
  ) {}

  async execute({ ids, session }: Params) {
    const { items: spots } = await this.listSpotsRepository.execute({
      ids,
      pageNumber: 1,
      pageSize: ids.length,
    });

    if (spots.some((spot) => spot.workspaceId !== session.user.workspaceId)) {
      throw new ForbiddenException('This spots belongs to another workspace');
    }

    return this.deleteSpotsRepository.execute(ids);
  }
}
