import { Injectable } from "@nestjs/common";
import { BrandResponsibleEntity } from "src/domain/entities/brand.entity";
import { BrandRepository } from "src/infra/database/repositories/brand-repository/brand.repository";
import {
  CreateBrandResponsibleDto,
  CreateBrandResponsibleResponseDto,
} from "src/modules/workspaces/brands/services/create-responsible/create-responsible.dto";
import { ValidateBrandResponsibleNameUseCase } from "src/modules/workspaces/brands/usecases/validate-responsible-name/validate-responsible-name.usecase";
import { isEqualString } from "src/shared/utils/is-equal-strings.util";

type CreateBrandResponsibleServiceParams = {
  brandId: string;
  addressId: string;
  data: CreateBrandResponsibleDto;
};

@Injectable()
export class CreateBrandResponsibleService {
  constructor(
    private readonly brandRepository: BrandRepository,
    private readonly validateBrandResponsibleNameUseCase: ValidateBrandResponsibleNameUseCase,
  ) {}

  async execute({
    data,
    brandId,
    addressId,
  }: CreateBrandResponsibleServiceParams): Promise<CreateBrandResponsibleResponseDto> {
    await this.validateBrandResponsibleNameUseCase.execute({
      addressId,
      brandId,
      name: data.name,
    });

    const responsibles = await this.brandRepository.upsertAddressResponsibles(
      addressId,
      [data],
    );

    return responsibles.find((r) =>
      isEqualString(r.name, data.name),
    ) as BrandResponsibleEntity;
  }
}
