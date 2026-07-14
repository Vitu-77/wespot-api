import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class PaginationParamsDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageNumber!: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize!: number;
}
