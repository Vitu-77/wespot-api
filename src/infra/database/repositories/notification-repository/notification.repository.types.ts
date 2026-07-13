import { PaginationParamsDto } from "src/shared/dto/pagination.dto";

export type NotificationRepositoryListNotificationsParams =
  PaginationParamsDto & {
    userId?: string;
  };

export type NotificationRepositoryCreateNotificationParams = {
  userId: string;
  title: string;
  content: string;
};
