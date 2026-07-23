import { ApiProperty } from "@nestjs/swagger";
import { TTSProvider } from "prisma-types/enums";
import { BaseEntity, BaseEntityDto } from "src/domain/entities/base.entity";

export type VoiceProfileEntity = BaseEntity & {
  name: string;
  provider: TTSProvider;
};

export class VoiceProfileEntityDto
  extends BaseEntityDto
  implements VoiceProfileEntity
{
  @ApiProperty()
  name!: string;

  @ApiProperty()
  provider!: TTSProvider;
}
