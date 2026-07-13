import {
  BadRequestException,
  Body,
  CallHandler,
  Controller,
  ExecutionContext,
  FileTypeValidator,
  Get,
  Injectable,
  MaxFileSizeValidator,
  mixin,
  NestInterceptor,
  ParseFilePipe,
  Post,
  Query,
  Type,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Observable } from "rxjs";
import { CreateBrandDto } from "src/modules/workspaces/brands/services/create-brand/create-brand.dto";
import { CreateBrandsService } from "src/modules/workspaces/brands/services/create-brand/create-brand.service";
import { ListWorkspaceBrandsParamsDto } from "src/modules/workspaces/brands/services/list-brands/list-brands.dto";
import { ListWorkspaceBrandsService } from "src/modules/workspaces/brands/services/list-brands/list-brands.service";
import { CurrentWorkspaceId } from "src/shared/decorators/current-workspace-id.decorator";
import { ProtectedRoute } from "src/shared/decorators/protected-route.decorator";

export function MultipartJsonInterceptor(
  field = "payload",
): Type<NestInterceptor> {
  @Injectable()
  class MultipartJsonInterceptorMixin implements NestInterceptor {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<unknown> {
      const request = context.switchToHttp().getRequest();

      const value = request.body?.[field];

      if (value == null) {
        return next.handle();
      }

      if (typeof value === "object") {
        request.body = value;

        return next.handle();
      }

      if (typeof value !== "string") {
        throw new BadRequestException(
          `Multipart field "${field}" must be a JSON string.`,
        );
      }

      try {
        request.body = JSON.parse(value);
      } catch {
        throw new BadRequestException(
          `Multipart field "${field}" contains invalid JSON.`,
        );
      }

      return next.handle();
    }
  }

  return mixin(MultipartJsonInterceptorMixin);
}

const _logoFileValidation = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({
      maxSize: 10 * 1024 * 1024, // 10MB
    }),
    new FileTypeValidator({
      fileType: /(jpg|jpeg|png)$/,
    }),
  ],
});

@Controller("workspace/brands")
export class BrandsController {
  constructor(
    private readonly listWorkspaceBrands: ListWorkspaceBrandsService,
    private readonly createBrandsService: CreateBrandsService,
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
    MultipartJsonInterceptor("payload"),
  )
  upload(
    @CurrentWorkspaceId() workspaceId: string,
    @UploadedFile() logoFile: MulterFile,
    @Body() body: CreateBrandDto,
  ) {
    return this.createBrandsService.execute({
      ...body,
      workspaceId,
      logoFile,
    });
  }
}
