import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { SpotStatus } from "prisma-types/enums";
import { SpotVersionEntity } from "src/domain/entities/spot-version.entity";
import { baseEntityBuilder } from "./base-entity.builder";

export const spotVersionEntityBuilder = Factory.define<SpotVersionEntity>(
  ({ params }) => ({
    ...baseEntityBuilder.build(),

    status: faker.helpers.arrayElement(Object.values(SpotStatus)),
    filename: faker.system.fileName({ extensionCount: 1 }),
    audioDuration: faker.number.int({ min: 5, max: 120 }),
    starred: faker.datatype.boolean(),

    voiceId: faker.string.uuid(),
    voice: undefined as any,

    spotId: faker.string.uuid(),
    spot: undefined as any,

    scriptId: faker.string.uuid(),
    script: undefined as any,

    ...params,
  }),
);
