import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { WorkspaceRole } from "prisma-types/enums";
import { WorkspaceUserEntityDto } from "src/domain/entities/workspace-user.entity";
import { PaginationResponseDto } from "src/shared/dto/paginated-response.dto";
import { PaginationParamsDto } from "src/shared/dto/pagination.dto";

export class ListWorkspaceUsersParamsDto implements PaginationParamsDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageNumber!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize!: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsEnum(WorkspaceRole)
  role?: WorkspaceRole;
}

export class ListWorkspaceUsersResponseDto {
  @ApiProperty({ isArray: true, type: () => WorkspaceUserEntityDto })
  items!: WorkspaceUserEntityDto[];

  @ApiProperty({ type: () => PaginationResponseDto })
  pagination!: PaginationResponseDto;
}
