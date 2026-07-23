import { Injectable } from "@nestjs/common";
import { SpotRepository } from "src/infra/database/repositories/spot-repository/spot.repository";
import { ListSpotsDto } from "src/modules/workspaces/spots/services/list-spots/list-spots.dto";
import { PaginatedResponseDto } from "src/shared/dto/paginated-response.dto";

@Injectable()
export class ListSpotsService {
  constructor(private readonly spotsRepository: SpotRepository) {}

  async execute({
    pageNumber,
    pageSize,
    workspaceId,
    ...filters
  }: InjectWorkspaceId<ListSpotsDto>) {
    const { spots, count } = await this.spotsRepository.listAndCount({
      workspaceId,
      pageNumber,
      pageSize,
      ...filters,
    });

    return new PaginatedResponseDto({
      items: spots,
      pageNumber,
      pageSize,
      totalItems: count,
    });
  }
}
