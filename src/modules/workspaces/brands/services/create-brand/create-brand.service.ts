import { Injectable, NotFoundException } from "@nestjs/common";
import { ErrorsMap } from "src/domain/exceptions/errors.map";
import { BrandRepository } from "src/infra/database/repositories/brand-repository/brand.repository";
import { WorkspaceRepository } from "src/infra/database/repositories/workspace-repository/workspace.repository";
import { StorageService } from "src/infra/storage/storage.service";
import {
  CreateBrandDto,
  CreateBrandResponseDto,
} from "src/modules/workspaces/brands/services/create-brand/create-brand.dto";
import { ValidateBrandNameUseCase } from "src/modules/workspaces/brands/usecases/validate-brand-name/validate-brand-name.usecase";

type CreateBrandsServicePayload = InjectWorkspaceId<CreateBrandDto> & {
  logoFile: MulterFile;
};

@Injectable()
export class CreateBrandsService {
  constructor(
    private readonly brandRepository: BrandRepository,
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly storageService: StorageService,
    private readonly validateBrandNameUseCase: ValidateBrandNameUseCase,
  ) {}

  async execute({
    workspaceId,
    logoFile,
    ...data
  }: CreateBrandsServicePayload): Promise<CreateBrandResponseDto> {
    await this.validateBrandNameUseCase.execute({
      name: data.name,
      workspaceId,
    });

    const workspace = await this.workspaceRepository.getById(workspaceId);

    if (!workspace) {
      throw new NotFoundException(
        CreateBrandsService.errors.WORKSPACE_NOT_FOUND,
      );
    }

    const uploadedFile = await this.storageService.upload({
      file: logoFile,
      bucket: "BRAND_LOGOS",
      workspace,
    });

    const brand = await this.brandRepository.createBrand({
      ...data,
      workspaceId,
      logoKey: uploadedFile.key,
    });

    return brand;
  }

  static errors = {
    WORKSPACE_NOT_FOUND: ErrorsMap.WORKSPACE_NOT_FOUND,
  };
}
