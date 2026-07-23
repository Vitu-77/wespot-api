import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { WorkspaceRole } from "prisma-types/enums";
import { WorkspaceMemberEntity } from "src/domain/entities/workspace-member.entity";
import { baseEntityBuilder } from "./base-entity.builder";

export const workspaceMemberEntityBuilder =
  Factory.define<WorkspaceMemberEntity>(({ params }) => {
    const { createdAt, updatedAt } = baseEntityBuilder.build();

    return {
      createdAt,
      updatedAt,

      role: faker.helpers.enumValue(WorkspaceRole),

      userId: faker.string.uuid(),
      user: undefined as any,

      workspaceId: faker.string.uuid(),
      workspace: undefined as any,

      ...params,
    };
  });
