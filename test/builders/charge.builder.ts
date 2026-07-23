import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { ChargeStatus } from "prisma-types/enums";
import { ChargeEntity } from "src/domain/entities/charge.entity";
import { baseEntityBuilder } from "./base-entity.builder";

export const chargeEntityBuilder = Factory.define<ChargeEntity>(
  ({ params }) => ({
    ...baseEntityBuilder.build(),

    status: faker.helpers.enumValue(ChargeStatus),
    value: BigInt(faker.number.int({ min: 100, max: 100_000 })),
    description: faker.commerce.productDescription(),

    invoiceSummaryId: faker.string.uuid(),

    ...params,
  }),
);
