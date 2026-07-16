import { BadRequestException, Injectable } from "@nestjs/common";
import { ErrorsMap } from "src/domain/exceptions/errors.map";
import { BrandRepository } from "src/infra/database/repositories/brand-repository/brand.repository";
import { isEqualString } from "src/shared/utils/is-equal-strings.util";

type ValidateBrandResponsibleNameUseCaseParams = {
  name: string;
  brandId: string;
  addressId: string;
};

@Injectable()
export class ValidateBrandResponsibleNameUseCase {
  constructor(private readonly brandRepository: BrandRepository) {}

  async execute({
    name,
    brandId,
    addressId,
  }: ValidateBrandResponsibleNameUseCaseParams) {
    const [brand] = await this.brandRepository.list({
      id: brandId,
      pageNumber: 1,
      pageSize: 1,
    });

    if (!brand) {
      throw new BadRequestException(
        ValidateBrandResponsibleNameUseCase.errors.BRAND_NOT_FOUND,
      );
    }

    const address = brand.addresses.find((a) => a.id === addressId);

    if (!address) {
      throw new BadRequestException(
        ValidateBrandResponsibleNameUseCase.errors.BRAND_ADDRESS_NOT_FOUND,
      );
    }

    if (address.responsibles.some((r) => isEqualString(r.name, name))) {
      throw new BadRequestException(
        ValidateBrandResponsibleNameUseCase.errors
          .BRAND_RESPONSIBLE_NAME_IS_TAKEN,
      );
    }
  }

  static errors = {
    BRAND_NOT_FOUND: ErrorsMap.BRAND_NOT_FOUND,
    BRAND_ADDRESS_NOT_FOUND: ErrorsMap.BRAND_ADDRESS_NOT_FOUND,
    BRAND_RESPONSIBLE_NAME_IS_TAKEN: ErrorsMap.BRAND_RESPONSIBLE_NAME_IS_TAKEN,
  };
}
