import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { CostService, TTSProvider } from "prisma-types/enums";
import { SpotCostEntity } from "src/domain/entities/spot-cost.entity";
import { baseEntityBuilder } from "./base-entity.builder";

export const spotCostEntityBuilder = Factory.define<SpotCostEntity>(
  ({ params }) => ({
    ...baseEntityBuilder.build(),

    provider: faker.helpers.arrayElement(Object.values(TTSProvider)),
    service: faker.helpers.arrayElement(Object.values(CostService)),
    costCents: faker.number.int({ min: 1, max: 10000 }),
    metadata: {
      characters: faker.number.int({ min: 10, max: 5000 }),
    } as any,

    spotId: faker.string.uuid(),
    spot: undefined as any,

    ...params,
  }),
);
