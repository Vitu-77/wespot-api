import { Injectable } from '@nestjs/common';
import { ListSpotsRepository } from 'src/modules/spots/repositories/list-spots.repository';
import { ListSpotsDto } from 'src/modules/spots/services/list-spots/list-spots.dto';
import { PaginatedResponseDTO } from 'src/shared/dto/paginated-response.dto';

@Injectable()
export class ListSpotsService {
  constructor(private readonly listSpotsRepository: ListSpotsRepository) {}

  async execute({ pageNumber, pageSize, ...filters }: ListSpotsDto) {
    const { items, totalItems } = await this.listSpotsRepository.execute({
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
