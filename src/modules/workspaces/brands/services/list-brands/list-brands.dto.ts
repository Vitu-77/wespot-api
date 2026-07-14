import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { BusinessSegment } from "prisma-types/enums";
import { BrandEntityDto } from "src/domain/entities/brand.entity";
import { PaginationResponseDto } from "src/shared/dto/paginated-response.dto";
import { PaginationParamsDto } from "src/shared/dto/pagination.dto";

export class ListBrandsParamsDto extends PaginationParamsDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ enum: BusinessSegment })
  @IsOptional()
  @IsEnum(BusinessSegment)
  segment?: BusinessSegment;
}

export class ListBrandsResponseDto {
  @ApiProperty({ isArray: true, type: () => BrandEntityDto })
  items!: BrandEntityDto[];

  @ApiProperty({ type: () => PaginationResponseDto })
  pagination!: PaginationResponseDto;
}
