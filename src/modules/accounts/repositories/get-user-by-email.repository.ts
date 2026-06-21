import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/domain/entities/user.entity';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class GetUserByEmailRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    return user as unknown as UserEntity;
  }
}
