import { Type } from 'class-transformer'
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator'
import { WorkspaceRole } from 'prisma-types/enums'
import { WorkspaceUserEntity } from 'src/domain/entities/workspace-user.entity'
import {
  IPagination,
  PaginatedResponseDTO,
} from 'src/shared/dto/paginated-response.dto'
import { PaginationDto } from 'src/shared/dto/pagination.dto'

export class ListWorkspaceUsersParamsDto implements PaginationDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageNumber!: number

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize!: number

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  email?: string

  @IsOptional()
  @IsEnum(WorkspaceRole)
  role?: WorkspaceRole
}

export class ListWorkspaceUsersResponseDto
  implements PaginatedResponseDTO<WorkspaceUserEntity>
{
  items!: WorkspaceUserEntity[]
  pagination!: IPagination
}
