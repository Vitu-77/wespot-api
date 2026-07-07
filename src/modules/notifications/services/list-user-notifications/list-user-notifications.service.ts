import { Injectable } from '@nestjs/common'
import { NotificationRepository } from 'src/infra/database/repositories/notification-repository/notification.repository'
import { PaginatedResponseDTO } from 'src/shared/dto/paginated-response.dto'
import { PaginationDto } from 'src/shared/dto/pagination.dto'

@Injectable()
export class ListUserNotificationsService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute({ pageNumber, pageSize, userId }: InjectUserId<PaginationDto>) {
    const { notifications, count } =
      await this.notificationRepository.listAndCount({
        pageNumber,
        pageSize,
        userId,
      })

    return new PaginatedResponseDTO({
      items: notifications,
      pageNumber,
      pageSize,
      totalItems: count,
    })
  }
}
