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
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import {
  ApiCreateBrandDocs,
  ApiDeleteBrandDocs,
  ApiListBrandsDocs,
  ApiUpdateBrandDocs,
} from "src/modules/workspaces/brands/brands.docs";
import { CreateBrandDto } from "src/modules/workspaces/brands/services/create-brand/create-brand.dto";
import { CreateBrandsService } from "src/modules/workspaces/brands/services/create-brand/create-brand.service";
import { DeleteBrandService } from "src/modules/workspaces/brands/services/delete-brand/delete-brand.service";
import { ListBrandsParamsDto } from "src/modules/workspaces/brands/services/list-brands/list-brands.dto";
import { ListBrandsService } from "src/modules/workspaces/brands/services/list-brands/list-brands.service";
import { UpdateBrandDto } from "src/modules/workspaces/brands/services/update-brand/update-brand.dto";
import { UpdateBrandsService } from "src/modules/workspaces/brands/services/update-brand/update-brand.service";
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

@ApiTags("Workspace ⌁ Brands")
@ApiWorkspaceHeader()
@Controller("workspace/brands")
export class BrandsController {
  constructor(
    private readonly listWorkspaceBrands: ListBrandsService,
    private readonly createBrandsService: CreateBrandsService,
    private readonly updateBrandsService: UpdateBrandsService,
    private readonly deleteBrandService: DeleteBrandService,
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
  @Put("/:brandId")
  @ApiUpdateBrandDocs()
  public updateBrand(
    @CurrentWorkspaceId() workspaceId: string,
    @Param("brandId") brandId: string,
    @Body() body: UpdateBrandDto,
  ) {
    return this.updateBrandsService.execute({
      brandId,
      workspaceId,
      data: body,
    });
  }

  @ProtectedRoute({ roles: ["ADMIN", "OWNER"] })
  @Delete("/:brandId")
  @ApiDeleteBrandDocs()
  public deleteBrand(@Param("brandId") brandId: string) {
    return this.deleteBrandService.execute({ brandId });
  }
}
