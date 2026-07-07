import { DateRangeDto } from 'src/shared/dto/date-range.dto'
import { PaginationDto } from 'src/shared/dto/pagination.dto'

export const paginate = ({ pageNumber, pageSize }: PaginationDto) => {
  return {
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
  }
}

export const contains = (filter?: string, mode?: 'default' | 'insensitive') => {
  return filter ? { contains: filter, mode } : undefined
}

export const isIn = (values?: any[]) => {
  return values && values.length ? { in: values } : undefined
}

export const hasEvery = (values: any[]) => {
  return values && values.length ? { hasEvery: values } : undefined
}

export const hasSome = (values: any[]) => {
  return values && values.length ? { hasSome: values } : undefined
}

export const dateRange = ({ fromAt, toAt }: Partial<DateRangeDto>) => {
  return {
    gte: fromAt ? new Date(fromAt) : undefined,
    lte: toAt ? new Date(toAt) : undefined,
  }
}
