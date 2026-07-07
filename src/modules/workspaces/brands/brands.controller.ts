import { Controller, Get, Query } from "@nestjs/common";
import { ListWorkspaceBrandsParamsDto } from "src/modules/workspaces/brands/services/list-brands/list-brands.dto";
import { ListWorkspaceBrandsService } from "src/modules/workspaces/brands/services/list-brands/list-brands.service";
import { CurrentWorkspaceId } from "src/shared/decorators/current-workspace-id.decorator";
import { ProtectedRoute } from "src/shared/decorators/protected-route.decorator";

@Controller("workspace/brands")
export class BrandsController {
  constructor(
    private readonly listWorkspaceBrands: ListWorkspaceBrandsService,
  ) {}

  @ProtectedRoute({ roles: ["ADMIN", "OWNER"] })
  @Get("/")
  listBrands(
    @Query() queryParams: ListWorkspaceBrandsParamsDto,
    @CurrentWorkspaceId() workspaceId: string,
  ) {
    return this.listWorkspaceBrands.execute({
      ...queryParams,
      workspaceId,
    });
  }
}
