import { ApiProperty } from "@nestjs/swagger";
import { NotificationEntityDto } from "src/domain/entities/notification.entity";
import { PaginationResponseDto } from "src/shared/dto/paginated-response.dto";
import { PaginationParamsDto } from "src/shared/dto/pagination.dto";

export class ListUserNotificationsDto extends PaginationParamsDto {}

export class ListUserNotificationsResponseDto {
  @ApiProperty({ isArray: true, type: () => NotificationEntityDto })
  items!: NotificationEntityDto[];

  @ApiProperty({ type: () => PaginationResponseDto })
  pagination!: PaginationResponseDto;
}
