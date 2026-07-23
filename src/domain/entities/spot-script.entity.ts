import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, BaseEntityDto } from "src/domain/entities/base.entity";
import { SpotVersionEntity } from "src/domain/entities/spot-version.entity";

export type SpotScriptEntity = BaseEntity & {
  content: string;

  spotVersions: SpotVersionEntity[];
};

export class SpotScriptEntityDto
  extends BaseEntityDto
  implements SpotScriptEntity
{
  @ApiProperty()
  content!: string;

  @ApiProperty({ isArray: true })
  spotVersions!: SpotVersionEntity[];
}
