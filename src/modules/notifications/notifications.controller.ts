import { Controller, Get, Param, Patch, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
  ApiListUserNotificationsDocs,
  ApiMarkNotificationAsReadDocs,
} from "src/modules/notifications/notifications.docs";
import { ListUserNotificationsDto } from "src/modules/notifications/services/list-user-notifications/list-user-notifications.dto";
import { ListUserNotificationsService } from "src/modules/notifications/services/list-user-notifications/list-user-notifications.service";
import { MarkNotificationAsReadService } from "src/modules/notifications/services/mark-as-read/mark-as-read.service";

@ApiTags("Notifications")
@Controller("notifications")
export class NotificationsController {
  constructor(
    private readonly listUserNotificationsService: ListUserNotificationsService,
    private readonly markNotificationAsReadService: MarkNotificationAsReadService,
  ) {}

  @Get("/:userId")
  @ApiListUserNotificationsDocs()
  listUserNotifications(
    @Query() queryParams: ListUserNotificationsDto,
    @Param("userId") userId: string,
  ) {
    return this.listUserNotificationsService.execute({
      ...queryParams,
      userId,
    });
  }

  @Patch("/:notificationId/read")
  @ApiMarkNotificationAsReadDocs()
  markNotificationAsRead(@Param("notificationId") notificationId: string) {
    return this.markNotificationAsReadService.execute(notificationId);
  }
}
