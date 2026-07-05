import { Module } from '@nestjs/common';
import { MarkNotificationAsReadService } from 'src/modules/notifications/services/mark-as-read/mark-as-read.service';
import { CreateNotificationService } from 'src/modules/notifications/services/create-notification/create-notification.service';
import { ListUserNotificationsService } from 'src/modules/notifications/services/list-user-notifications/list-user-notifications.service';
import { NotificationsController } from 'src/modules/notifications/controllers/spots.controller';

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
