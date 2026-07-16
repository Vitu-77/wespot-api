import { Injectable } from "@nestjs/common";
import { BrandRepository } from "src/infra/database/repositories/brand-repository/brand.repository";
import {
  DeleteBrandAddressResponsiblesDto,
  DeleteBrandAddressResponsiblesResponseDto,
} from "src/modules/workspaces/brands/services/delete-brand-address-responsibles/delete-brand-address-responsibles.dto";

@Injectable()
export class DeleteBrandAddressResponsiblesService {
  constructor(private readonly brandRepository: BrandRepository) {}

  async execute({
    ids,
  }: DeleteBrandAddressResponsiblesDto): Promise<DeleteBrandAddressResponsiblesResponseDto> {
    await this.brandRepository.deleteResponsiblesByIds(ids);
    return { success: true };
  }
}
