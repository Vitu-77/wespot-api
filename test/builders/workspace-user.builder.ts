import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { AuthProvider, WorkspaceRole } from "prisma-types/enums";
import { WorkspaceUserEntity } from "src/domain/entities/workspace-user.entity";
import { baseEntityBuilder } from "./base-entity.builder";

export const workspaceUserEntityBuilder = Factory.define<WorkspaceUserEntity>(
  ({ params }) => ({
    ...baseEntityBuilder.build(),

    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatarUrl: faker.image.avatar(),
    authProvider: faker.helpers.enumValue(AuthProvider),
    fingerprint: faker.string.uuid(),
    role: faker.helpers.enumValue(WorkspaceRole),

    ...params,
  }),
);
