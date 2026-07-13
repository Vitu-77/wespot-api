import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "src/infra/database/repositories/notification-repository/notification.repository";
import { PaginatedResponseDto } from "src/shared/dto/paginated-response.dto";
import { PaginationParamsDto } from "src/shared/dto/pagination.dto";

@Injectable()
export class ListUserNotificationsService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute({
    pageNumber,
    pageSize,
    userId,
  }: InjectUserId<PaginationParamsDto>) {
    const { notifications, count } =
      await this.notificationRepository.listAndCount({
        pageNumber,
        pageSize,
        userId,
      });

    return new PaginatedResponseDto({
      items: notifications,
      pageNumber,
      pageSize,
      totalItems: count,
    });
  }
}
