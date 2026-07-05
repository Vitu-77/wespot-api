import { Injectable } from '@nestjs/common';
import { InviteCreateInput, InviteUpdateInput } from 'prisma-types/models';
import { InviteEntity } from 'src/domain/entities/invite.entity';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export class InviteRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getById(id: string): Promise<InviteEntity | null> {
    const invite = await this.prismaService.invite.findUnique({
      where: {
        id,
      },
    });

    return invite;
  }

  async create(data: InviteCreateInput): Promise<InviteEntity> {
    const invite = await this.prismaService.invite.create({
      data,
    });

    return invite;
  }

  async update(id: string, data: InviteUpdateInput): Promise<InviteEntity> {
    const invite = await this.prismaService.invite.update({
      where: {
        id,
      },

      data,
    });

    return invite;
  }

  async deleteByUserEmail(userEmail: string): Promise<void> {
    await this.prismaService.invite.deleteMany({
      where: {
        userEmail,
      },
    });
  }
}
