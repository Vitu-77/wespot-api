import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";
import { SpotRepositoryListParams } from "src/infra/database/repositories/spot-repository/spot.repository.types";
import { contains, isIn, paginate } from "src/shared/utils/query-helpers";

@Injectable()
export class SpotRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async list({ pageNumber, pageSize, ...filters }: SpotRepositoryListParams) {
    return await this.prismaService.spot.findMany({
      ...paginate({ pageNumber, pageSize }),

      orderBy: {
        createdAt: "desc",
      },

      where: {
        ...filters,
        id: isIn(filters.ids),
        title: contains(filters.title, "insensitive"),
      },
    });
  }

  async listAndCount({
    pageNumber,
    pageSize,
    ...filters
  }: SpotRepositoryListParams) {
    const [spots, count] = await Promise.all([
      this.list({ pageNumber, pageSize, ...filters }),
      this.prismaService.spot.count({
        where: {
          ...filters,
        },
      }),
    ]);

    return {
      count,
      spots,
    };
  }

  async deleteMany(ids: string[]) {
    return await this.prismaService.spot.deleteMany({
      where: {
        id: isIn(ids),
      },
    });
  }
}
