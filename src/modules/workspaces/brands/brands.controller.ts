import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import {
  ApiCreateBrandAddressDocs,
  ApiCreateBrandDocs,
  ApiDeleteBrandAddressesDocs,
  ApiListBrandsDocs,
} from "src/modules/workspaces/brands/brands.docs";
import { CreateBrandDto } from "src/modules/workspaces/brands/services/create-brand/create-brand.dto";
import { CreateBrandsService } from "src/modules/workspaces/brands/services/create-brand/create-brand.service";
import { CreateBrandAddressDto } from "src/modules/workspaces/brands/services/create-brand-address/create-brand-address.dto";
import { CreateBrandAddressService } from "src/modules/workspaces/brands/services/create-brand-address/create-brand-address.service";
import { DeleteBrandAddressesDto } from "src/modules/workspaces/brands/services/delete-brand-addresses/delete-brand-addresses.dto";
import { DeleteBrandAddressesService } from "src/modules/workspaces/brands/services/delete-brand-addresses/delete-brand-addresses.service";
import { ListBrandsParamsDto } from "src/modules/workspaces/brands/services/list-brands/list-brands.dto";
import { ListBrandsService } from "src/modules/workspaces/brands/services/list-brands/list-brands.service";
import { ApiWorkspaceHeader } from "src/shared/decorators/api-workspace-header.decorator";
import { CurrentWorkspaceId } from "src/shared/decorators/current-workspace-id.decorator";
import { ProtectedRoute } from "src/shared/decorators/protected-route.decorator";
import { JsonParserInterceptor } from "src/shared/interceptors/json-parser.interceptor";

const logoFileValidation = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({
      maxSize: 10 * 1024 * 1024, // 10MB
    }),
    new FileTypeValidator({
      fileType: /(jpg|jpeg|png)$/,
    }),
  ],
});

@ApiTags("Workspace / Brands")
@ApiWorkspaceHeader()
@Controller("workspace/brands")
export class BrandsController {
  constructor(
    private readonly listWorkspaceBrands: ListBrandsService,
    private readonly createBrandsService: CreateBrandsService,
    private readonly createBrandAddressService: CreateBrandAddressService,
    private readonly deleteBrandAddressesService: DeleteBrandAddressesService,
  ) {}

  @ProtectedRoute()
  @Get("/")
  @ApiListBrandsDocs()
  public listBrands(
    @Query() queryParams: ListBrandsParamsDto,
    @CurrentWorkspaceId() workspaceId: string,
  ) {
    return this.listWorkspaceBrands.execute({
      ...queryParams,
      workspaceId,
    });
  }

  @ProtectedRoute()
  @Post("/")
  @ApiCreateBrandDocs()
  @UseInterceptors(
    FileInterceptor("logo_image"),
    JsonParserInterceptor("payload"),
  )
  public createBrand(
    @CurrentWorkspaceId() workspaceId: string,
    @UploadedFile(logoFileValidation) logoFile: MulterFile,
    @Body() body: CreateBrandDto,
  ) {
    return this.createBrandsService.execute({
      ...body,
      workspaceId,
      logoFile,
    });
  }

  @ProtectedRoute()
  @Post("/:brandId/address")
  @ApiCreateBrandAddressDocs()
  public createBrandAddress(
    @Param("brandId") brandId: string,
    @Body() body: CreateBrandAddressDto,
  ) {
    return this.createBrandAddressService.execute({ ...body, brandId });
  }

  @ProtectedRoute({ roles: ["ADMIN", "OWNER"] })
  @Delete("/:brandId/address")
  @ApiDeleteBrandAddressesDocs()
  public deleteBrandAddresses(@Body() body: DeleteBrandAddressesDto) {
    return this.deleteBrandAddressesService.execute(body);
  }
}
