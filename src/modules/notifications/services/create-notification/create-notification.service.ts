import { Injectable } from '@nestjs/common'
import { NotificationRepository } from 'src/infra/database/repositories/notification-repository/notification.repository'
import { CreateNotificationDto } from 'src/modules/notifications/services/create-notification/create-notification.dto'

@Injectable()
export class CreateNotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute({ userIds, ...data }: CreateNotificationDto) {
    const notifications = await Promise.all(
      userIds.map((userId) =>
        this.notificationRepository.create({
          userId,
          ...data,
        }),
      ),
    )

    return notifications
  }
}
