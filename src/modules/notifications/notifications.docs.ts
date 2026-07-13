import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { ListUserNotificationsResponseDto } from "src/modules/notifications/services/list-user-notifications/list-user-notifications.dto";
import { MarkNotificationAsReadResponseDto } from "src/modules/notifications/services/mark-as-read/mark-as-read.dto";

export function ApiListUserNotificationsDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "List user notifications",
      description:
        "Returns all notifications associated with the authenticated user.",
    }),
    ApiOkResponse({
      description: "User notifications successfully retrieved.",
      type: ListUserNotificationsResponseDto,
    }),
  );
}

export function ApiMarkNotificationAsReadDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Mark notification as read",
      description: "Marks a notification as read for the authenticated user.",
    }),
    ApiOkResponse({
      description: "Notification successfully marked as read.",
      type: MarkNotificationAsReadResponseDto,
    }),
  );
}
