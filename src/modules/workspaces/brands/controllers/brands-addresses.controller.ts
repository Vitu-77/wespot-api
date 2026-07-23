import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
  ApiCreateBrandAddressDocs,
  ApiDeleteBrandAddressesDocs,
  ApiUpdateBrandAddressDocs,
} from "src/modules/workspaces/brands/brands.docs";
import { CreateBrandAddressDto } from "src/modules/workspaces/brands/services/create-brand-address/create-brand-address.dto";
import { CreateBrandAddressService } from "src/modules/workspaces/brands/services/create-brand-address/create-brand-address.service";
import { DeleteBrandAddressesDto } from "src/modules/workspaces/brands/services/delete-brand-addresses/delete-brand-addresses.dto";
import { DeleteBrandAddressesService } from "src/modules/workspaces/brands/services/delete-brand-addresses/delete-brand-addresses.service";
import { UpdateBrandAddressDto } from "src/modules/workspaces/brands/services/update-brand-address/update-brand-address.dto";
import { UpdateBrandAddressService } from "src/modules/workspaces/brands/services/update-brand-address/update-brand-address.service";
import { ApiWorkspaceHeader } from "src/shared/decorators/api-workspace-header.decorator";
import { ProtectedRoute } from "src/shared/decorators/protected-route.decorator";

@ApiTags("Workspace ⌁ Brands")
@ApiWorkspaceHeader()
@Controller("workspace/brands/:brandId/address")
export class BrandAddressesController {
  constructor(
    private readonly createBrandAddressService: CreateBrandAddressService,
    private readonly updateBrandAddressService: UpdateBrandAddressService,
    private readonly deleteBrandAddressesService: DeleteBrandAddressesService,
  ) {}

  @ProtectedRoute()
  @Post("/")
  @ApiCreateBrandAddressDocs()
  public createBrandAddress(
    @Param("brandId") brandId: string,
    @Body() body: CreateBrandAddressDto,
  ) {
    return this.createBrandAddressService.execute({ ...body, brandId });
  }

  @ProtectedRoute()
  @Put("/:addressId")
  @ApiUpdateBrandAddressDocs()
  public updateBrandAddress(
    @Param("addressId") addressId: string,
    @Body() body: UpdateBrandAddressDto,
  ) {
    return this.updateBrandAddressService.execute({
      data: body,
      addressId,
    });
  }

  @ProtectedRoute({ roles: ["ADMIN", "OWNER"] })
  @Delete("/")
  @ApiDeleteBrandAddressesDocs()
  public deleteBrandAddresses(@Body() body: DeleteBrandAddressesDto) {
    return this.deleteBrandAddressesService.execute(body);
  }
}
