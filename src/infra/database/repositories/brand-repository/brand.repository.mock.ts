import { BrandRepository } from "src/infra/database/repositories/brand-repository/brand.repository";

jest.mock(
  "src/infra/database/repositories/brand-repository/brand.repository",
  () => ({
    BrandRepository: class {},
  }),
);

type BrandRepositoryMock = Omit<BrandRepository, "prismaService">;

export const brandRepositoryMock: jest.Mocked<BrandRepositoryMock> = {
  list: jest.fn(),
  listAndCount: jest.fn(),
  createBrand: jest.fn(),
  createAddress: jest.fn(),
  updateBrand: jest.fn(),
  updateAddress: jest.fn(),
  upsertAddressResponsibles: jest.fn(),
  deleteBrandById: jest.fn(),
  deleteAddressesByIds: jest.fn(),
  deleteResponsiblesByIds: jest.fn(),
} satisfies BrandRepositoryMock;
