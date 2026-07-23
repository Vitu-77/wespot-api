import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { PlanEntity } from "src/domain/entities/plan.entity";
import { baseEntityBuilder } from "./base-entity.builder";

export const planEntityBuilder = Factory.define<PlanEntity>(({ params }) => ({
  ...baseEntityBuilder.build(),

  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: BigInt(faker.number.int({ min: 1_000, max: 100_000 })),
  resources: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
    faker.lorem.words(2),
  ),

  subscriptions: [],

  ...params,
}));
