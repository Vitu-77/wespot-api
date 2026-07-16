import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
  ApiCreateBrandAddressResponsibleDocs,
  ApiDeleteBrandAddressResponsiblesDocs,
} from "src/modules/workspaces/brands/brands.docs";
import { CreateBrandResponsibleDto } from "src/modules/workspaces/brands/services/create-brand-address-responsible/create-brand-address-responsible.dto";
import { CreateBrandResponsibleService } from "src/modules/workspaces/brands/services/create-brand-address-responsible/create-brand-address-responsible.service";
import { DeleteBrandAddressResponsiblesService } from "src/modules/workspaces/brands/services/delete-brand-address-responsibles/delete-brand-address-responsibles.service";
import { DeleteBrandAddressesDto } from "src/modules/workspaces/brands/services/delete-brand-addresses/delete-brand-addresses.dto";
import { ApiWorkspaceHeader } from "src/shared/decorators/api-workspace-header.decorator";
import { ProtectedRoute } from "src/shared/decorators/protected-route.decorator";

@ApiTags("Workspace ⌁ Brands")
@ApiWorkspaceHeader()
@Controller("workspace/brands")
export class BrandResponsiblesController {
  constructor(
    private readonly createBrandResponsibleService: CreateBrandResponsibleService,
    private readonly deleteBrandAddressResponsiblesService: DeleteBrandAddressResponsiblesService,
  ) {}

  @ProtectedRoute()
  @Post("/:brandId/address/:addressId/responsible")
  @ApiCreateBrandAddressResponsibleDocs()
  public createAddressResponsible(
    @Param("brandId") brandId: string,
    @Param("addressId") addressId: string,
    @Body() body: CreateBrandResponsibleDto,
  ) {
    return this.createBrandResponsibleService.execute({
      brandId,
      addressId,
      data: body,
    });
  }

  @ProtectedRoute({ roles: ["ADMIN", "OWNER"] })
  @Delete("/:brandId/address/:addressId/responsibles")
  @ApiDeleteBrandAddressResponsiblesDocs()
  public deleteBrandAddressResponsibles(@Body() body: DeleteBrandAddressesDto) {
    return this.deleteBrandAddressResponsiblesService.execute(body);
  }
}
