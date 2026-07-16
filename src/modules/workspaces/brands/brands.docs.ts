import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";
import { ErrorCodes } from "src/domain/exceptions/error-codes.enum";
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
  CreateBrandResponsibleDto,
  CreateBrandResponsibleResponseDto,
} from "src/modules/workspaces/brands/services/create-brand-address-responsible/create-brand-address-responsible.dto";
import { DeleteBrandResponseDto } from "src/modules/workspaces/brands/services/delete-brand/delete-brand.dto";
import {
  DeleteBrandAddressResponsiblesDto,
  DeleteBrandAddressResponsiblesResponseDto,
} from "src/modules/workspaces/brands/services/delete-brand-address-responsibles/delete-brand-address-responsibles.dto";
import {
  DeleteBrandAddressesDto,
  DeleteBrandAddressesResponseDto,
} from "src/modules/workspaces/brands/services/delete-brand-addresses/delete-brand-addresses.dto";
import { ListBrandsResponseDto } from "src/modules/workspaces/brands/services/list-brands/list-brands.dto";
import {
  UpdateBrandDto,
  UpdateBrandResponseDto,
} from "src/modules/workspaces/brands/services/update-brand/update-brand.dto";
import {
  UpdateBrandAddressDto,
  UpdateBrandAddressResponseDto,
} from "src/modules/workspaces/brands/services/update-brand-address/update-brand-address.dto";
import { ValidateBrandNameUseCase } from "src/modules/workspaces/brands/usecases/validate-brand-name/validate-brand-name.usecase";
import { ValidateBrandResponsibleNameUseCase } from "src/modules/workspaces/brands/usecases/validate-responsible-name/validate-responsible-name.usecase";
import { ApiError } from "src/shared/dto/api-error.dto";

export function ApiListBrandsDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "List brands",
      description: "List all brands from a given workspace.",
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
    ApiBadRequestResponse(
      ApiError(ValidateBrandNameUseCase.errors.BRAND_NAME_IS_TAKEN),
    ),
  );
}

export function ApiUpdateBrandDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Update brand",
      description: "Update a brand (Do not include addresses infos).",
    }),
    ApiBody({
      type: UpdateBrandDto,
    }),
    ApiOkResponse({
      description: "Brand updated successfully.",
      type: UpdateBrandResponseDto,
    }),
    ApiBadRequestResponse(
      ApiError(ValidateBrandNameUseCase.errors.BRAND_NAME_IS_TAKEN),
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

export function ApiCreateBrandAddressResponsibleDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Create address responsible",
      description: "Add a new responsible to a addresss.",
    }),
    ApiBody({
      type: CreateBrandResponsibleDto,
    }),
    ApiOkResponse({
      description: "Responsible created successfully.",
      type: CreateBrandResponsibleResponseDto,
    }),

    ApiNotFoundResponse({
      description: "The requested resource was not found.",
      content: {
        "application/json": {
          examples: {
            [ErrorCodes.BRAND_NOT_FOUND]: {
              summary: "Brand not found",
              value: ApiError(
                ValidateBrandResponsibleNameUseCase.errors.BRAND_NOT_FOUND,
              ),
            },
            [ErrorCodes.BRAND_ADDRESS_NOT_FOUND]: {
              summary: "Brand address not found",
              value: ApiError(
                ValidateBrandResponsibleNameUseCase.errors
                  .BRAND_ADDRESS_NOT_FOUND,
              ),
            },
          },
        },
      },
    }),

    ApiBadRequestResponse(
      ApiError(
        ValidateBrandResponsibleNameUseCase.errors
          .BRAND_RESPONSIBLE_NAME_IS_TAKEN,
      ),
    ),
  );
}

export function ApiUpdateBrandAddressDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Update address & responsibles",
      description: "Update address and his responsibles",
    }),
    ApiBody({
      type: UpdateBrandAddressDto,
    }),
    ApiParam({
      name: "brandId",
      type: String,
      required: true,
    }),
    ApiOkResponse({
      description: "Address updated successfully.",
      type: UpdateBrandAddressResponseDto,
    }),
  );
}

export function ApiDeleteBrandDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Delete brand",
      description: "Delete a brand and all addresses related.",
    }),
    ApiParam({
      name: "brandId",
      type: String,
    }),
    ApiOkResponse({
      description: "Brand deleted successfully.",
      type: DeleteBrandResponseDto,
    }),
  );
}

export function ApiDeleteBrandAddressesDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Delete addresses",
      description: "Delete brand addresses for given ids.",
    }),
    ApiBody({
      type: DeleteBrandAddressesDto,
    }),
    ApiParam({
      name: "brandId",
      type: String,
    }),
    ApiOkResponse({
      description: "Addresses deleted successfully.",
      type: DeleteBrandAddressesResponseDto,
    }),
  );
}

export function ApiDeleteBrandAddressResponsiblesDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Delete address responsibles",
      description: "Delete brand address responsibles for given ids.",
    }),
    ApiBody({
      type: DeleteBrandAddressResponsiblesDto,
    }),
    ApiParam({
      name: "brandId",
      type: String,
    }),
    ApiParam({
      name: "addressId",
      type: String,
    }),
    ApiOkResponse({
      description: "Responsibles deleted successfully.",
      type: DeleteBrandAddressResponsiblesResponseDto,
    }),
  );
}
