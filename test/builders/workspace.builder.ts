import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { WorkspaceType } from "prisma-types/enums";
import { WorkspaceEntity } from "src/domain/entities/workspace.entity";
import { baseEntityBuilder } from "./base-entity.builder";

export const workspaceEntityBuilder = Factory.define<WorkspaceEntity>(
  ({ params }) => ({
    ...baseEntityBuilder.build(),

    name: faker.company.name(),
    type: faker.helpers.enumValue(WorkspaceType),
    slug: faker.helpers.slugify(faker.company.name()).toLowerCase(),

    brands: [],

    spots: [],

    members: [],

    ...params,
  }),
);
