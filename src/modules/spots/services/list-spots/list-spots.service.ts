import { Injectable } from '@nestjs/common';
import { ListSpotsDto } from 'src/modules/spots/services/list-spots/list-spots.dto';
import { PaginatedResponseDTO } from 'src/shared/dto/paginated-response.dto';

@Injectable()
export class ListSpotsService {
  execute({ pageNumber, pageSize, ...filters }: ListSpotsDto) {
    const items = [];

    return new PaginatedResponseDTO({
      items,
      pageNumber,
      pageSize,
      totalItems: 10,
    });
  }
}
