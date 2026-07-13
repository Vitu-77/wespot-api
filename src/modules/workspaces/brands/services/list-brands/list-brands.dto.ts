import { IsEnum, IsOptional, IsString } from "class-validator";
import { BusinessSegment } from "prisma-types/enums";
import { PaginationParamsDto } from "src/shared/dto/pagination.dto";

export class ListWorkspaceBrandsParamsDto extends PaginationParamsDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEnum(BusinessSegment)
  segment?: BusinessSegment;
}
