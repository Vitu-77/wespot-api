import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { SpotTone, SpotType } from "prisma-types/enums";
import { SpotEntity } from "src/domain/entities/spot.entity";
import { baseEntityBuilder } from "./base-entity.builder";

export const spotEntityBuilder = Factory.define<SpotEntity>(({ params }) => ({
  ...baseEntityBuilder.build(),

  title: faker.company.name(),
  isDraft: faker.datatype.boolean(),
  starred: faker.datatype.boolean(),

  type: faker.helpers.arrayElement(Object.values(SpotType)),
  voiceTone: faker.helpers.arrayElement(Object.values(SpotTone)),

  workspaceId: faker.string.uuid(),
  workspace: undefined as any,

  brandId: faker.datatype.boolean() ? faker.string.uuid() : null,
  brand: undefined as any,

  inputId: faker.datatype.boolean() ? faker.string.uuid() : null,
  input: undefined as any,

  versions: [],

  ...params,
}));
