import { applyDecorators } from "@nestjs/common";
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from "@nestjs/swagger";
import {
  CreateBrandDto,
  CreateBrandResponseDto,
} from "src/modules/workspaces/brands/services/create-brand/create-brand.dto";
import { CreateBrandsService } from "src/modules/workspaces/brands/services/create-brand/create-brand.service";
import {
  CreateBrandAddressDto,
  CreateBrandAddressResponseDto,
} from "src/modules/workspaces/brands/services/create-brand-address/create-brand-address.dto";
import { CreateBrandAddressService } from "src/modules/workspaces/brands/services/create-brand-address/create-brand-address.service";
import {
  ListBrandsParamsDto,
  ListBrandsResponseDto,
} from "src/modules/workspaces/brands/services/list-brands/list-brands.dto";
import { ApiError } from "src/shared/dto/api-error.dto";

export function ApiListBrandsDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "List brands",
      description: "List all brands from a given workspace.",
    }),
    ApiQuery({
      type: ListBrandsParamsDto,
    }),
    ApiOkResponse({
      description: "Brands listed.",
      type: ListBrandsResponseDto,
    }),
  );
}

export function ApiCreateBrandDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Create brand",
      description: "Create a new brand.",
    }),
    ApiBody({
      type: CreateBrandDto,
    }),
    ApiOkResponse({
      description: "Brand created successfully.",
      type: CreateBrandResponseDto,
    }),

    ApiNotFoundResponse(
      ApiError(CreateBrandsService.errors.WORKSPACE_NOT_FOUND),
    ),
  );
}

export function ApiCreateBrandAddressDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Create address",
      description: "Add a new addresss to a brand.",
    }),
    ApiBody({
      type: CreateBrandAddressDto,
    }),
    ApiOkResponse({
      description: "Address created successfully.",
      type: CreateBrandAddressResponseDto,
    }),

    ApiNotFoundResponse(
      ApiError(CreateBrandAddressService.errors.BRAND_NOT_FOUND),
    ),
  );
}
