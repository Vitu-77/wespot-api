import { Injectable } from '@nestjs/common';
import { BrandRepository } from 'src/infra/database/repositories/brand-repository/brand.repository';
import { ListWorkspaceBrandsParamsDto } from 'src/modules/brands/services/list-brands/list-brands.dto';
import { PaginatedResponseDTO } from 'src/shared/dto/paginated-response.dto';

@Injectable()
export class ListWorkspaceBrandsService {
  constructor(private readonly brandRepository: BrandRepository) {}

  async execute({
    pageNumber,
    pageSize,
    ...filters
  }: InjectWorkspaceId<ListWorkspaceBrandsParamsDto>) {
    const { brands, count } = await this.brandRepository.listAndCount({
      pageNumber,
      pageSize,
      ...filters,
    });

    return new PaginatedResponseDTO({
      items: brands,
      totalItems: count,
      pageNumber,
      pageSize,
    });
  }
}
