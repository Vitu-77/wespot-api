import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { BaseEntity } from "src/domain/entities/base.entity";

export const baseEntityBuilder = Factory.define<BaseEntity>(({ params }) => ({
  id: faker.string.uuid(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),

  ...params,
}));
