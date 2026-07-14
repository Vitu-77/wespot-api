import { Injectable } from "@nestjs/common";
import { BrandRepository } from "src/infra/database/repositories/brand-repository/brand.repository";
import { ListBrandsParamsDto } from "src/modules/workspaces/brands/services/list-brands/list-brands.dto";
import { PaginatedResponseDto } from "src/shared/dto/paginated-response.dto";

@Injectable()
export class ListBrandsService {
  constructor(private readonly brandRepository: BrandRepository) {}

  async execute({
    pageNumber,
    pageSize,
    ...filters
  }: InjectWorkspaceId<ListBrandsParamsDto>) {
    const { brands, count } = await this.brandRepository.listAndCount({
      pageNumber,
      pageSize,
      ...filters,
    });

    return new PaginatedResponseDto({
      items: brands,
      totalItems: count,
      pageNumber,
      pageSize,
    });
  }
}
