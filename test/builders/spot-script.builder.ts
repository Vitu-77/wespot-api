import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { SpotScriptEntity } from "src/domain/entities/spot-script.entity";
import { baseEntityBuilder } from "./base-entity.builder";

export const spotEntityBuilder = Factory.define<SpotScriptEntity>(
  ({ params }) => ({
    ...baseEntityBuilder.build(),

    content: faker.lorem.paragraph(3),
    spotVersions: [],

    ...params,
  }),
);
