import { Injectable } from '@nestjs/common'
import { NotificationRepository } from 'src/infra/database/repositories/notification-repository/notification.repository'

@Injectable()
export class MarkNotificationAsReadService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(id: string) {
    const notification = await this.notificationRepository.update(id, {
      readAt: new Date(),
    })

    return notification
  }
}
