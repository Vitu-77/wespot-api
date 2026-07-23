import { faker } from "@faker-js/faker";
import { Factory } from "fishery";

import { SpotInputEntity } from "src/domain/entities/spot-input.entity";

export const spotInputEntityBuilder = Factory.define<SpotInputEntity>(
  ({ params }) => ({
    data: {
      prompt: faker.lorem.sentence(),
      duration: faker.number.int({ min: 15, max: 60 }),
    } as any,

    spotId: faker.string.uuid(),
    spot: undefined as any,

    ...params,
  }),
);
