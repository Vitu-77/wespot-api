import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, BaseEntityDto } from "src/domain/entities/base.entity";
import { UserEntity, UserEntityDto } from "src/domain/entities/user.entity";

export type NotificationEntity = BaseEntity & {
  title: string;
  content: string;
  readAt: Date | string | null;

  userId: string;
  user?: UserEntity;
};

export class NotificationEntityDto
  extends BaseEntityDto
  implements NotificationEntity
{
  @ApiProperty()
  title!: string;

  @ApiProperty()
  content!: string;

  @ApiProperty({ type: "string", format: "date-time" })
  readAt!: string | Date | null;

  @ApiProperty()
  userId!: string;

  @ApiProperty({ type: () => UserEntityDto })
  user?: UserEntity | undefined;
}
