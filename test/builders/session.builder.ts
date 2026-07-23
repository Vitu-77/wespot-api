import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { SessionEntity } from "src/domain/entities/session.entity";

export const sessionEntityBuilder = Factory.define<SessionEntity>(
  ({ params }) => ({
    userId: faker.string.uuid(),
    refreshTokenHash: faker.string.alphanumeric(128),
    createdAt: faker.date.recent(),

    ...params,
  }),
);
