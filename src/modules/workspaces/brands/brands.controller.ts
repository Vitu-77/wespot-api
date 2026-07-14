import {
  Body,
  Controller,
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
import { ApiCreateBrandAddressDocs } from "src/modules/workspaces/brands/brands.docs";
import { CreateBrandDto } from "src/modules/workspaces/brands/services/create-brand/create-brand.dto";
import { CreateBrandsService } from "src/modules/workspaces/brands/services/create-brand/create-brand.service";
import { CreateBrandAddressDto } from "src/modules/workspaces/brands/services/create-brand-address/create-brand-address.dto";
import { CreateBrandAddressService } from "src/modules/workspaces/brands/services/create-brand-address/create-brand-address.service";
import { ListWorkspaceBrandsParamsDto } from "src/modules/workspaces/brands/services/list-brands/list-brands.dto";
import { ListWorkspaceBrandsService } from "src/modules/workspaces/brands/services/list-brands/list-brands.service";
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
@Controller("workspace/brands")
export class BrandsController {
  constructor(
    private readonly listWorkspaceBrands: ListWorkspaceBrandsService,
    private readonly createBrandsService: CreateBrandsService,
    private readonly createBrandAddressService: CreateBrandAddressService,
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

  @ProtectedRoute()
  @Post("/")
  @UseInterceptors(
    FileInterceptor("logo_image"),
    JsonParserInterceptor("payload"),
  )
  createBrand(
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
  createBrandAddress(
    @Param("brandId") brandId: string,
    @Body() body: CreateBrandAddressDto,
  ) {
    return this.createBrandAddressService.execute({ ...body, brandId });
  }
}
