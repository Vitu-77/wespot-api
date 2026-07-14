import { Injectable } from "@nestjs/common";
import { BrandRepository } from "src/infra/database/repositories/brand-repository/brand.repository";
import {
  DeleteBrandAddressesDto,
  DeleteBrandAddressesResponseDto,
} from "src/modules/workspaces/brands/services/delete-brand-addresses/delete-brand-addresses.dto";

@Injectable()
export class DeleteBrandAddressesService {
  constructor(private readonly brandRepository: BrandRepository) {}

  async execute({
    ids,
  }: DeleteBrandAddressesDto): Promise<DeleteBrandAddressesResponseDto> {
    await this.brandRepository.deleteAddressesByIds(ids);
    return { success: true };
  }
}
