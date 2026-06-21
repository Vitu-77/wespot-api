import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { isIn } from 'src/shared/utils/query-helpers';

@Injectable()
export class DeleteSpotsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(ids: string[]) {
    return this.prismaService.spot.deleteMany({
      where: {
        id: isIn(ids),
      },
    });
  }
}
