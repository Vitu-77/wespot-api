import { Injectable, NotFoundException } from "@nestjs/common";
import { BrandAddressEntityDto } from "src/domain/entities/brand.entity";
import { ErrorsMap } from "src/domain/exceptions/errors.map";
import { BrandRepository } from "src/infra/database/repositories/brand-repository/brand.repository";
import { CreateBrandAddressDto } from "src/modules/workspaces/brands/services/create-brand-address/create-brand-address.dto";

type Payload = CreateBrandAddressDto & {
  brandId: string;
};

@Injectable()
export class CreateBrandAddressService {
  constructor(private readonly brandRepository: BrandRepository) {}

  async execute(payload: Payload): Promise<BrandAddressEntityDto> {
    const [brand] = await this.brandRepository.list({
      pageSize: 1,
      pageNumber: 1,
      id: payload.brandId,
    });

    if (!brand) {
      throw new NotFoundException(
        CreateBrandAddressService.errors.BRAND_NOT_FOUND,
      );
    }

    return this.brandRepository.createAddress(payload);
  }

  static errors = {
    BRAND_NOT_FOUND: ErrorsMap.BRAND_NOT_FOUND,
  };
}
