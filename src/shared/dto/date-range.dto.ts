import { Type } from 'class-transformer';
import { IsDateString, IsOptional } from 'class-validator';

export class DateRangeDto {
  @Type(() => Date)
  @IsOptional()
  @IsDateString({ strict: true })
  fromAt?: Date;

  @Type(() => Date)
  @IsOptional()
  @IsDateString({ strict: true })
  toAt?: Date;
}
