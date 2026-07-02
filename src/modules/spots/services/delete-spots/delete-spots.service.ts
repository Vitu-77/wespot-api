import { Injectable } from '@nestjs/common';
import { SpotRepository } from 'src/infra/database/repositories/spot-repository/spot.repository';
import { DeleteSpotsDto } from 'src/modules/spots/services/delete-spots/delete-spots.dto';

type Params = DeleteSpotsDto & {
  workspaceId: string;
};

@Injectable()
export class DeleteSpotsService {
  constructor(private readonly spotsRepository: SpotRepository) {}

  async execute({ ids, workspaceId }: Params) {
    const spots = await this.spotsRepository.list({
      ids,
      pageNumber: 1,
      workspaceId,
      pageSize: ids.length,
    });

    return this.spotsRepository.deleteMany(spots.map((spot) => spot.id));
  }
}
