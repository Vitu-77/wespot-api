type Input<T> = {
  items: T[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
};

export interface IPagination {
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

export class PaginatedResponseDTO<T> {
  items: T[];
  pagination: IPagination;

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
