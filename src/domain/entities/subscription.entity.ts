import { ApiProperty } from "@nestjs/swagger";
import { SubscriptionStatus } from "prisma-types/enums";
import { BaseEntity, BaseEntityDto } from "src/domain/entities/base.entity";

export type SubscriptionEntity = BaseEntity & {
  overdueAt: Date | null;
  status: SubscriptionStatus;
  creditCardToken: string;
  creditCardMask: string;
  workspaceId: string;
};

export class SubscriptionEntityDto
  extends BaseEntityDto
  implements SubscriptionEntity
{
  @ApiProperty({ type: Date, required: false })
  overdueAt!: Date | null;

  @ApiProperty({
    enum: SubscriptionStatus,
    enumName: "SubscriptionStatus",
  })
  status!: SubscriptionStatus;

  @ApiProperty()
  creditCardToken!: string;

  @ApiProperty()
  creditCardMask!: string;

  @ApiProperty()
  workspaceId!: string;
}
