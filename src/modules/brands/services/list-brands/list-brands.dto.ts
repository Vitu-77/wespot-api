import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BusinessSegment } from 'prisma-types/enums';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class ListWorkspaceBrandsParamsDto extends PaginationDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEnum(BusinessSegment)
  segment?: BusinessSegment;
}
