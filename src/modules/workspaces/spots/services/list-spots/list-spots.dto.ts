import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'
import { SpotStatus } from 'prisma-types/enums'
import { PaginationDto } from 'src/shared/dto/pagination.dto'

export class ListSpotsDto extends PaginationDto {
  @IsUUID()
  workspaceId!: string

  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsEnum(SpotStatus)
  status?: SpotStatus

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  starred?: boolean

  @IsOptional()
  @IsUUID()
  brandId?: string
}
