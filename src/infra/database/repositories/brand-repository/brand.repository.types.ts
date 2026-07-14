import { BrandCreateInput } from "prisma-types/models";
import { CreateBrandAddressDto } from "src/modules/workspaces/brands/services/create-brand-address/create-brand-address.dto";
import { ListWorkspaceBrandsParamsDto } from "src/modules/workspaces/brands/services/list-brands/list-brands.dto";

export type BrandRepositoryListParams = ListWorkspaceBrandsParamsDto & {
  id?: string;
  workspaceId?: string;
};

export type BrandRepositoryCreateParams = Omit<
  BrandCreateInput,
  "workspace" | "addresses"
> & {
  workspaceId: string;
  addresses: CreateBrandAddressDto[];
};

export type BrandRepositoryCreateAddressParams = CreateBrandAddressDto & {
  brandId: string;
};
