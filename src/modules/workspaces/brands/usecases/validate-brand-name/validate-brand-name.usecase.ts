import { BadRequestException, Injectable } from "@nestjs/common";
import { ErrorsMap } from "src/domain/exceptions/errors.map";
import { BrandRepository } from "src/infra/database/repositories/brand-repository/brand.repository";

type ValidateBrandNameUseCaseParams = {
  name: string;
  workspaceId: string;
};

@Injectable()
export class ValidateBrandNameUseCase {
  constructor(private readonly brandRepository: BrandRepository) {}

  async execute({ name, workspaceId }: ValidateBrandNameUseCaseParams) {
    const [brand] = await this.brandRepository.list({
      pageNumber: 1,
      pageSize: 1,
      workspaceId,
      name,
    });

    if (brand) {
      throw new BadRequestException(
        ValidateBrandNameUseCase.errors.BRAND_NAME_IS_TAKEN,
      );
    }
  }

  static errors = {
    BRAND_NAME_IS_TAKEN: ErrorsMap.BRAND_NAME_IS_TAKEN,
  };
}
