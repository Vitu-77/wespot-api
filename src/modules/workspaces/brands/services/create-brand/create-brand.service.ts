import { Injectable, NotFoundException } from "@nestjs/common";
import { ErrorsMap } from "src/domain/exceptions/errors.map";
import { BrandRepository } from "src/infra/database/repositories/brand-repository/brand.repository";
import { WorkspaceRepository } from "src/infra/database/repositories/workspace-repository/workspace.repository";
import { StorageService } from "src/infra/storage/storage.service";
import {
  CreateBrandDto,
  CreateBrandResponseDto,
} from "src/modules/workspaces/brands/services/create-brand/create-brand.dto";
import { createSlug } from "src/shared/utils/create-slug";

type CreateBrandsServicePayload = InjectWorkspaceId<CreateBrandDto> & {
  logoFile: MulterFile;
};

@Injectable()
export class CreateBrandsService {
  constructor(
    private readonly brandRepository: BrandRepository,
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly storageService: StorageService,
  ) {}

  async execute({
    workspaceId,
    logoFile,
    ...data
  }: CreateBrandsServicePayload): Promise<CreateBrandResponseDto> {
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
      prefix: createSlug(`${data.name}-logo`),
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
