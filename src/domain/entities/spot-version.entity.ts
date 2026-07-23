import { ApiProperty } from "@nestjs/swagger";
import { SpotStatus } from "prisma-types/enums";
import { BaseEntity, BaseEntityDto } from "src/domain/entities/base.entity";
import { SpotEntity, SpotEntityDto } from "src/domain/entities/spot.entity";
import {
  SpotScriptEntity,
  SpotScriptEntityDto,
} from "src/domain/entities/spot-script.entity";
import {
  VoiceProfileEntity,
  VoiceProfileEntityDto,
} from "src/domain/entities/voice-profile.entity";

export type SpotVersionEntity = BaseEntity & {
  status: SpotStatus;
  filename: string | null;
  audioDuration: number | null;
  starred: boolean;

  voiceId: string;
  voice?: VoiceProfileEntity;

  spotId: string;
  spot?: SpotEntity;

  scriptId: string;
  script?: SpotScriptEntity;
};

export class SpotVersionEntityDto
  extends BaseEntityDto
  implements SpotVersionEntity
{
  @ApiProperty()
  status!: SpotStatus;

  @ApiProperty()
  filename!: string | null;

  @ApiProperty()
  audioDuration!: number | null;

  @ApiProperty()
  starred!: boolean;

  @ApiProperty()
  voiceId!: string;

  @ApiProperty({ type: () => VoiceProfileEntityDto })
  voice!: VoiceProfileEntityDto;

  @ApiProperty()
  spotId!: string;

  @ApiProperty({ type: () => SpotEntityDto, required: false })
  spot?: SpotEntityDto;

  @ApiProperty()
  scriptId!: string;

  @ApiProperty({ type: () => SpotScriptEntityDto })
  script!: SpotScriptEntityDto;
}
