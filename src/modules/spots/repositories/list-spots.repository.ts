import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { ListSpotsDto } from 'src/modules/spots/services/list-spots/list-spots.dto';
import { paginate, contains, isIn } from 'src/shared/utils/query-helpers';

type Params = Omit<ListSpotsDto, 'workspaceId'> & {
  workspaceId?: string;
  ids?: string[];
  includeTotal?: boolean;
};

@Injectable()
export class ListSpotsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({
    pageNumber,
    pageSize,
    includeTotal = true,
    ...filters
  }: Params) {
    const items = await this.prismaService.spot.findMany({
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

    if (!includeTotal) {
      return { items };
    }

    const totalItems = await this.prismaService.spot.count({
      where: {
        ...filters,
      },
    });

    return {
      totalItems,
      items,
    };
  }
}
