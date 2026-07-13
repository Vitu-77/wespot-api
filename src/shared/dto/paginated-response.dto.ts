import { ApiProperty } from "@nestjs/swagger";

type Input<T> = {
  items: T[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
};

export class PaginationResponseDto {
  @ApiProperty()
  totalItems!: number;

  @ApiProperty()
  pageNumber!: number;

  @ApiProperty()
  pageSize!: number;

  @ApiProperty()
  totalPages!: number;

  @ApiProperty()
  hasPrevPage!: boolean;

  @ApiProperty()
  hasNextPage!: boolean;
}

export class PaginatedResponseDto<T> {
  @ApiProperty({ isArray: true })
  items!: T[];

  @ApiProperty({ type: () => PaginationResponseDto })
  pagination!: PaginationResponseDto;

  constructor(input: Input<T>) {
    const totalPages = Math.max(
      1,
      Math.ceil(input.totalItems / input.pageSize),
    );

    this.items = input.items;

    this.pagination = {
      totalItems: input.totalItems,
      pageNumber: input.pageNumber,
      pageSize: input.pageSize,
      totalPages,
      hasPrevPage: input.pageNumber > 1,
      hasNextPage: input.pageNumber < totalPages,
    };
  }
}
