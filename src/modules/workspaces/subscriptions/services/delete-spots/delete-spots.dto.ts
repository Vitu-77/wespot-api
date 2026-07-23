import { IsArray, IsUUID, MinLength } from 'class-validator'

export class DeleteSpotsDto {
  @IsArray()
  @MinLength(1)
  @IsUUID()
  ids!: string[]
}
