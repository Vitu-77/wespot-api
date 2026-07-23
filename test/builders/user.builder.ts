import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { AuthProvider, WorkspaceRole } from "prisma-types/enums";
import {
  MembershipmentEntity,
  UserEntity,
} from "src/domain/entities/user.entity";
import { baseEntityBuilder } from "./base-entity.builder";
import { workspaceEntityBuilder } from "./workspace.builder";

export const membershipmentEntityBuilder = Factory.define<MembershipmentEntity>(
  ({ params }) => ({
    role: faker.helpers.enumValue(WorkspaceRole),

    workspace: workspaceEntityBuilder.build() as any,

    ...params,
  }),
);

export const userEntityBuilder = Factory.define<UserEntity>(({ params }) => ({
  ...baseEntityBuilder.build(),

  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  avatarUrl: faker.image.avatar(),
  authProvider: faker.helpers.enumValue(AuthProvider),
  fingerprint: faker.string.uuid(),

  workspaces: [],

  ...params,
}));
