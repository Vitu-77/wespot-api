import { applyDecorators } from "@nestjs/common";
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import {
  CreateBrandAddressDto,
  CreateBrandAddressResponseDto,
} from "src/modules/workspaces/brands/services/create-brand-address/create-brand-address.dto";
import { CreateBrandAddressService } from "src/modules/workspaces/brands/services/create-brand-address/create-brand-address.service";
import { ApiError } from "src/shared/dto/api-error.dto";

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
      ApiError(CreateBrandAddressService.errors.WORKSPACE_NOT_FOUND),
    ),
  );
}
