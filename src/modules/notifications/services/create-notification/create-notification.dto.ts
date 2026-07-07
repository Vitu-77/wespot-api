import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator'

export class CreateNotificationDto {
  @IsArray()
  @MinLength(1)
  @IsUUID()
  userIds!: string[]

  @IsString()
  @IsNotEmpty()
  title!: string

  @IsString()
  @IsNotEmpty()
  content!: string
}
