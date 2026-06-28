import { Injectable } from '@nestjs/common';
import { SpotRepository } from 'src/infra/database/repositories/spot.repository';
import { ListSpotsDto } from 'src/modules/spots/services/list-spots/list-spots.dto';
import { PaginatedResponseDTO } from 'src/shared/dto/paginated-response.dto';

@Injectable()
export class ListSpotsService {
  constructor(private readonly spotsRepository: SpotRepository) {}

  async execute({ pageNumber, pageSize, ...filters }: ListSpotsDto) {
    const { items, totalItems } = await this.spotsRepository.list({
      includeTotal: true,
      pageNumber,
      pageSize,
      ...filters,
    });

    return new PaginatedResponseDTO({
      items,
      pageNumber,
      pageSize,
      totalItems: totalItems ?? 0,
    });
  }
}
