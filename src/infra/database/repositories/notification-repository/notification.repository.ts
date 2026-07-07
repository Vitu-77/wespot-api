import { Injectable } from '@nestjs/common'
import { NotificationUpdateInput } from 'prisma-types/models'
import { NotificationEntity } from 'src/domain/entities/notification.entity'
import { PrismaService } from 'src/infra/database/prisma.service'
import {
  NotificationRepositoryCreateNotificationParams,
  NotificationRepositoryListNotificationsParams,
} from 'src/infra/database/repositories/notification-repository/notification.repository.types'
import { paginate } from 'src/shared/utils/query-helpers'

@Injectable()
export class NotificationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async list({
    pageNumber,
    pageSize,
    userId,
  }: NotificationRepositoryListNotificationsParams): Promise<
    NotificationEntity[]
  > {
    const notifications = await this.prismaService.notification.findMany({
      ...paginate({ pageNumber, pageSize }),

      where: {
        userId,
      },
    })

    return notifications as NotificationEntity[]
  }

  async listAndCount(params: NotificationRepositoryListNotificationsParams) {
    const [notifications, count] = await Promise.all([
      this.list(params),
      this.prismaService.notification.count({
        where: {
          userId: params.userId,
        },
      }),
    ])

    return {
      notifications,
      count,
    }
  }

  async create(
    data: NotificationRepositoryCreateNotificationParams,
  ): Promise<NotificationEntity> {
    const notification = await this.prismaService.notification.create({
      data: {
        content: data.content,
        title: data.title,
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    })

    return notification as NotificationEntity
  }

  async update(
    id: string,
    data: NotificationUpdateInput,
  ): Promise<NotificationEntity> {
    const notification = await this.prismaService.notification.update({
      where: {
        id,
      },

      data,
    })

    return notification as NotificationEntity
  }
}
