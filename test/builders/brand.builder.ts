// brand.builder.ts

import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { BrazilianState, BusinessSegment } from "prisma-types/enums";
import {
  BrandAddressEntity,
  BrandEntity,
  BrandResponsibleEntity,
} from "src/domain/entities/brand.entity";
import { baseEntityBuilder } from "./base-entity.builder";

export const brandEntityBuilder = Factory.define<BrandEntity>(({ params }) => ({
  ...baseEntityBuilder.build(),

  name: faker.company.name(),
  segment: faker.helpers.enumValue(BusinessSegment),
  description: faker.lorem.sentence(),
  logoKey: faker.system.filePath(),
  slogan: faker.company.catchPhrase(),
  phoneNumber: faker.phone.number(),
  whatsapp: faker.phone.number(),
  instagram: faker.internet.username(),
  tiktok: faker.internet.username(),
  facebook: faker.internet.username(),
  website: faker.internet.url(),

  workspaceId: faker.string.uuid(),
  workspace: undefined as any,

  spots: [],
  addresses: [],

  ...params,
}));

export const brandAddressEntityBuilder = Factory.define<BrandAddressEntity>(
  ({ params }) => ({
    id: faker.string.uuid(),

    state: faker.helpers.enumValue(BrazilianState),
    city: faker.location.city(),
    neighborhood: faker.location.county(),
    street: faker.location.street(),
    number: faker.location.buildingNumber(),
    complement: faker.location.secondaryAddress(),

    brandId: faker.string.uuid(),
    brand: undefined as any,

    responsibles: [],

    ...params,
  }),
);

export const brandResponsibleEntityBuilder =
  Factory.define<BrandResponsibleEntity>(({ params }) => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    role: faker.person.jobTitle(),

    brandAddressId: faker.string.uuid(),
    brandAddress: undefined as any,

    ...params,
  }));
