import { ListWorkspaceBrandsParamsDto } from "src/modules/workspaces/brands/services/list-brands/list-brands.dto";

export type BrandRepositoryListParams = ListWorkspaceBrandsParamsDto & {
  workspaceId?: string;
};
