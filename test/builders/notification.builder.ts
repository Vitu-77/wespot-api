import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { NotificationEntity } from "src/domain/entities/notification.entity";
import { baseEntityBuilder } from "./base-entity.builder";

export const notificationEntityBuilder = Factory.define<NotificationEntity>(
  ({ params }) => ({
    ...baseEntityBuilder.build(),

    title: faker.lorem.words(3),
    content: faker.lorem.paragraph(),
    readAt: faker.date.recent(),

    userId: faker.string.uuid(),
    user: undefined as any,

    ...params,
  }),
);
