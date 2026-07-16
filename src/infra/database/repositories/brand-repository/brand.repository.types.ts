import {
  BrandCreateInput,
  BrandResponsibleCreateInput,
} from "prisma-types/models";
import {
  BrandAddressEntity,
  BrandEntity,
} from "src/domain/entities/brand.entity";
import { CreateBrandAddressDto } from "src/modules/workspaces/brands/services/create-brand-address/create-brand-address.dto";
import { ListBrandsParamsDto } from "src/modules/workspaces/brands/services/list-brands/list-brands.dto";

export type BrandRepositoryListParams = ListBrandsParamsDto & {
  id?: string;
  workspaceId?: string;
};

export type BrandRepositoryListResponse = Array<
  Omit<BrandEntity, "addresses"> & {
    addresses: Array<RequireFields<BrandAddressEntity, "responsibles">>;
  }
>;

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

export type UpsertBrandResponsiblesDataItem = Pick<
  BrandResponsibleCreateInput,
  "name" | "role"
> & {
  id?: string;
};
