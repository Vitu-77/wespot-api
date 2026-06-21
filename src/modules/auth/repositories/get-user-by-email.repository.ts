import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class GetUserByEmailRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }
}
