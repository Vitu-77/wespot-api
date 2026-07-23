import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { InvoiceSummaryEntity } from "src/domain/entities/invoice-summary.entity";
import { baseEntityBuilder } from "./base-entity.builder";

export const invoiceSummaryEntityBuilder = Factory.define<InvoiceSummaryEntity>(
  ({ params }) => ({
    ...baseEntityBuilder.build(),

    fromAt: faker.date.past(),
    toAt: faker.date.future(),
    availableSpots: faker.number.int({ min: 0, max: 1_000 }),
    generatedSpots: faker.number.int({ min: 0, max: 1_000 }),

    subscriptionId: faker.string.uuid(),

    ...params,
  }),
);
