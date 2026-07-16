import { BadRequestException } from "@nestjs/common";
import { brandRepositoryMock } from "src/infra/database/repositories/brand-repository/brand.repository.mock";
import { ValidateBrandNameUseCase } from "src/modules/workspaces/brands/usecases/validate-brand-name/validate-brand-name.usecase";

const brandRepository = brandRepositoryMock;

describe("ValidateBrandNameUseCase", () => {
  let useCase: ValidateBrandNameUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new ValidateBrandNameUseCase(brandRepository as any);
  });

  describe("execute", () => {
    it("should not throw when brand name is available", async () => {
      brandRepository.list.mockResolvedValue([]);

      await expect(
        useCase.execute({
          name: "Nike",
          workspaceId: "workspace-id",
        }),
      ).resolves.toBeUndefined();

      expect(brandRepository.list).toHaveBeenCalledWith({
        pageNumber: 1,
        pageSize: 1,
        workspaceId: "workspace-id",
        name: "Nike",
      });
    });

    it("should throw BadRequestException when brand name already exists", async () => {
      brandRepository.list.mockResolvedValue([
        {
          id: "brand-id",
          name: "Nike",
        } as any,
      ]);

      await expect(
        useCase.execute({
          name: "Nike",
          workspaceId: "workspace-id",
        }),
      ).rejects.toThrow(BadRequestException);

      expect(brandRepository.list).toHaveBeenCalledWith({
        pageNumber: 1,
        pageSize: 1,
        workspaceId: "workspace-id",
        name: "Nike",
      });
    });

    it("should throw the correct error message", async () => {
      brandRepository.list.mockResolvedValue([{} as any]);

      await expect(
        useCase.execute({
          name: "Nike",
          workspaceId: "workspace-id",
        }),
      ).rejects.toThrow(
        ValidateBrandNameUseCase.errors.BRAND_NAME_IS_TAKEN as any,
      );
    });
  });
});
