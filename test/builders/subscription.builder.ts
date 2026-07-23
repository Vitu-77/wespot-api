import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { SubscriptionStatus } from "prisma-types/enums";
import { SubscriptionEntity } from "src/domain/entities/subscription.entity";
import { baseEntityBuilder } from "./base-entity.builder";

export const subscriptionEntityBuilder = Factory.define<SubscriptionEntity>(
  ({ params }) => ({
    ...baseEntityBuilder.build(),

    overdueAt: faker.datatype.boolean() ? faker.date.future() : null,
    status: faker.helpers.enumValue(SubscriptionStatus),
    creditCardToken: faker.string.alphanumeric(64),
    creditCardMask: "**** **** **** 1234",

    workspaceId: faker.string.uuid(),

    ...params,
  }),
);
