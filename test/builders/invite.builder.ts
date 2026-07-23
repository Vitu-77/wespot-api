import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { WorkspaceRole } from "prisma-types/enums";
import { InviteEntity } from "src/domain/entities/invite.entity";
import { baseEntityBuilder } from "./base-entity.builder";

export const inviteEntityBuilder = Factory.define<InviteEntity>(
  ({ params }) => ({
    ...baseEntityBuilder.build(),

    userEmail: faker.internet.email(),
    workspaceId: faker.string.uuid(),
    userRole: faker.helpers.enumValue(WorkspaceRole),

    ...params,
  }),
);
