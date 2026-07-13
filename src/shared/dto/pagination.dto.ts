import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class PaginationParamsDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageNumber!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize!: number;
}
