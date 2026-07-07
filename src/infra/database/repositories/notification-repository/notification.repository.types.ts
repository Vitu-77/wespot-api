import { PaginationDto } from 'src/shared/dto/pagination.dto'

export type NotificationRepositoryListNotificationsParams = PaginationDto & {
  userId?: string
}

export type NotificationRepositoryCreateNotificationParams = {
  userId: string
  title: string
  content: string
}
