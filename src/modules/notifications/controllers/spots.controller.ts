import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { CreateNotificationService } from 'src/modules/notifications/services/create-notification/create-notification.service';
import { ListUserNotificationsDto } from 'src/modules/notifications/services/list-user-notifications/list-user-notifications.dto';
import { ListUserNotificationsService } from 'src/modules/notifications/services/list-user-notifications/list-user-notifications.service';
import { MarkNotificationAsReadService } from 'src/modules/notifications/services/mark-as-read/mark-as-read.service';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly listUserNotificationsService: ListUserNotificationsService,
    private readonly createNotificationService: CreateNotificationService,
    private readonly markNotificationAsReadService: MarkNotificationAsReadService,
  ) {}

  @Get('/:userId')
  listUserNotifications(
    @Query() queryParams: ListUserNotificationsDto,
    @Param('userId') userId: string,
  ) {
    return this.listUserNotificationsService.execute({
      ...queryParams,
      userId,
    });
  }

  @Patch('/:notificationId')
  markAsRead(@Param('notificationId') notificationId: string) {
    return this.markNotificationAsReadService.execute(notificationId);
  }
}
