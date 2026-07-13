import { BrandCreateInput } from "prisma-types/models";
import { UpsertBrandAddressDto } from "src/modules/workspaces/brands/services/create-brand/create-brand.dto";
import { ListWorkspaceBrandsParamsDto } from "src/modules/workspaces/brands/services/list-brands/list-brands.dto";

export type BrandRepositoryListParams = ListWorkspaceBrandsParamsDto & {
  workspaceId?: string;
};

export type BrandRepositoryCreateParams = Omit<
  BrandCreateInput,
  "workspace" | "addresses"
> & {
  workspaceId: string;
  addresses: UpsertBrandAddressDto[];
};
