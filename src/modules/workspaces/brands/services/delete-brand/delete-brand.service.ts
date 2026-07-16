import { Injectable } from "@nestjs/common";
import { BrandRepository } from "src/infra/database/repositories/brand-repository/brand.repository";
import {
  DeleteBrandDto,
  DeleteBrandResponseDto,
} from "src/modules/workspaces/brands/services/delete-brand/delete-brand.dto";

@Injectable()
export class DeleteBrandService {
  constructor(private readonly brandRepository: BrandRepository) {}

  async execute({ brandId }: DeleteBrandDto): Promise<DeleteBrandResponseDto> {
    await this.brandRepository.deleteBrandById(brandId);
    return { success: true };
  }
}
