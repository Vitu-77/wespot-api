import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, BaseEntityDto } from "src/domain/entities/base.entity";
import {
  SubscriptionEntity,
  SubscriptionEntityDto,
} from "src/domain/entities/subscription.entity";

export type PlanEntity = BaseEntity & {
  name: string;
  description: string;
  price: bigint;
  resources: String[];
  subscriptions: SubscriptionEntity[];
};

export class PlanEntityDto extends BaseEntityDto implements PlanEntity {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  price!: bigint;

  @ApiProperty()
  value!: bigint;

  @ApiProperty({ type: "string", isArray: true })
  resources!: string[];

  @ApiProperty({ type: () => SubscriptionEntityDto, isArray: true })
  subscriptions!: SubscriptionEntityDto[];
}
