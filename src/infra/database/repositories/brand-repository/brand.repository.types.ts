import { ListWorkspaceBrandsParamsDto } from 'src/modules/brands/services/list-brands/list-brands.dto';

export type BrandRepositoryListParams = ListWorkspaceBrandsParamsDto & {
  workspaceId?: string;
};
