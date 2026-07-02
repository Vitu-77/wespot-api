import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { ListSpotsDto } from 'src/modules/spots/services/list-spots/list-spots.dto';
import { contains, isIn, paginate } from 'src/shared/utils/query-helpers';

type ListSpotsParams = Omit<ListSpotsDto, 'workspaceId'> & {
  workspaceId?: string;
  ids?: string[];
};

@Injectable()
export class SpotRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async list({ pageNumber, pageSize, ...filters }: ListSpotsParams) {
    return this.prismaService.spot.findMany({
      ...paginate({ pageNumber, pageSize }),

      orderBy: {
        createdAt: 'desc',
      },

      where: {
        ...filters,
        id: isIn(filters.ids),
        title: contains(filters.title, 'insensitive'),
      },
    });
  }

  async listAndCount({ pageNumber, pageSize, ...filters }: ListSpotsParams) {
    const spots = await this.list({ pageNumber, pageSize, ...filters });
    const count = await this.prismaService.spot.count({
      where: {
        ...filters,
      },
    });

    return {
      count,
      spots,
    };
  }

  async deleteMany(ids: string[]) {
    return this.prismaService.spot.deleteMany({
      where: {
        id: isIn(ids),
      },
    });
  }
}
