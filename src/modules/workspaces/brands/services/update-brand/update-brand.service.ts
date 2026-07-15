import { Injectable } from "@nestjs/common";
import { ErrorsMap } from "src/domain/exceptions/errors.map";
import { BrandRepository } from "src/infra/database/repositories/brand-repository/brand.repository";
import {
  UpdateBrandDto,
  UpdateBrandResponseDto,
} from "src/modules/workspaces/brands/services/update-brand/update-brand.dto";
import { ValidateBrandNameUseCase } from "src/modules/workspaces/brands/usecases/validate-brand-name/validate-brand-name.usecase";

type UpdateBrandsServiceParams = InjectWorkspaceId<{
  brandId: string;
  data: UpdateBrandDto;
}>;

@Injectable()
export class UpdateBrandsService {
  constructor(
    private readonly brandRepository: BrandRepository,
    private readonly validateBrandNameUseCase: ValidateBrandNameUseCase,
  ) {}

  async execute({
    brandId,
    workspaceId,
    data,
  }: UpdateBrandsServiceParams): Promise<UpdateBrandResponseDto> {
    await this.validateBrandNameUseCase.execute({
      name: data.name,
      workspaceId,
    });

    return this.brandRepository.updateBrand(brandId, data);
  }

  static errors = {
    WORKSPACE_NOT_FOUND: ErrorsMap.WORKSPACE_NOT_FOUND,
  };
}
