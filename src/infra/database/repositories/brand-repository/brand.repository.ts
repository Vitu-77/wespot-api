import { Injectable } from "@nestjs/common";
import { BrandAddressUpdateInput, BrandUpdateInput } from "prisma-types/models";
import {
  BrandAddressEntity,
  BrandEntity,
} from "src/domain/entities/brand.entity";
import { PrismaService } from "src/infra/database/prisma.service";
import {
  BrandRepositoryCreateAddressParams,
  BrandRepositoryCreateParams,
  BrandRepositoryListParams,
} from "src/infra/database/repositories/brand-repository/brand.repository.types";
import { contains, paginate } from "src/shared/utils/query-helpers";

@Injectable()
export class BrandRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async list({
    pageNumber,
    pageSize,
    ...filters
  }: BrandRepositoryListParams): Promise<BrandEntity[]> {
    const brands = await this.prismaService.brand.findMany({
      ...paginate({ pageNumber, pageSize }),

      where: {
        id: filters.id,
        name: contains(filters.name, "insensitive"),
        segment: filters.segment,
        workspaceId: filters.workspaceId,
      },

      include: {
        addresses: {
          include: {
            responsibles: true,
          },
        },
      },
    });

    return brands as BrandEntity[];
  }

  async listAndCount(params: BrandRepositoryListParams) {
    const [brands, count] = await Promise.all([
      this.list(params),
      this.prismaService.brand.count({
        where: {
          name: contains(params.name, "default"),
          segment: params.segment,
        },
      }),
    ]);

    return {
      brands,
      count,
    };
  }

  async createBrand({
    workspaceId,
    ...data
  }: BrandRepositoryCreateParams): Promise<BrandEntity> {
    const brand = (await this.prismaService.brand.create({
      data: {
        ...data,

        workspace: {
          connect: {
            id: workspaceId,
          },
        },

        addresses: {},
      },
    })) as BrandEntity;

    const addressData = data.addresses[0];
    const address = await this.createAddress({
      ...addressData,
      brandId: brand.id,
    });

    address.responsibles = await this.prismaService.brandResponsible.findMany({
      where: {
        brandAddressId: address.id,
      },
    });

    brand.addresses = [address];

    return brand;
  }

  async updateBrand(id: string, data: BrandUpdateInput): Promise<BrandEntity> {
    const brand = await this.prismaService.brand.update({
      where: {
        id,
      },

      data,

      include: {
        addresses: true,
      },
    });

    return brand;
  }

  async createAddress({
    responsibles,
    ...data
  }: BrandRepositoryCreateAddressParams): Promise<BrandAddressEntity> {
    const address = await this.prismaService.brandAddress.create({
      data: {
        ...data,
        responsibles: {
          createMany: {
            data: responsibles,
          },
        },
      },
    });

    return address;
  }

  async updateAddress(
    id: string,
    data: BrandAddressUpdateInput,
  ): Promise<BrandAddressEntity> {
    const brandAddress = await this.prismaService.brandAddress.update({
      where: {
        id,
      },

      data,
    });

    return brandAddress;
  }

  async deleteBrand(id: string): Promise<void> {
    await this.prismaService.brand.delete({
      where: {
        id,
      },
    });
  }

  async deleteAddress(id: string): Promise<void> {
    await this.prismaService.brandAddress.delete({
      where: {
        id,
      },
    });
  }
}
