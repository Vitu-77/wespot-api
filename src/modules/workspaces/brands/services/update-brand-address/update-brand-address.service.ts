import { Injectable } from "@nestjs/common";
import { BrandAddressEntityDto } from "src/domain/entities/brand.entity";
import { BrandRepository } from "src/infra/database/repositories/brand-repository/brand.repository";
import { UpdateBrandAddressDto } from "src/modules/workspaces/brands/services/update-brand-address/update-brand-address.dto";

type UpdateBrandAddressServiceParams = {
  addressId: string;
  data: UpdateBrandAddressDto;
};

@Injectable()
export class UpdateBrandAddressService {
  constructor(private readonly brandRepository: BrandRepository) {}

  async execute({
    addressId,
    data: { responsibles: responsiblesData, ...rest },
  }: UpdateBrandAddressServiceParams): Promise<BrandAddressEntityDto> {
    const address = await this.brandRepository.updateAddress(addressId, rest);
    const responsibles = await this.brandRepository.upsertAddressResponsibles(
      addressId,
      responsiblesData,
    );

    return {
      ...address,
      responsibles,
    };
  }
}
