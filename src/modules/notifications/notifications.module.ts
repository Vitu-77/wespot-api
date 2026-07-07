import { Module } from '@nestjs/common'
import { NotificationsController } from 'src/modules/notifications/controllers/spots.controller'
import { CreateNotificationService } from 'src/modules/notifications/services/create-notification/create-notification.service'
import { ListUserNotificationsService } from 'src/modules/notifications/services/list-user-notifications/list-user-notifications.service'
import { MarkNotificationAsReadService } from 'src/modules/notifications/services/mark-as-read/mark-as-read.service'

@Module({
  imports: [],
  controllers: [NotificationsController],
  providers: [
    CreateNotificationService,
    MarkNotificationAsReadService,
    ListUserNotificationsService,
  ],
})
export class NotificationsModule {}
