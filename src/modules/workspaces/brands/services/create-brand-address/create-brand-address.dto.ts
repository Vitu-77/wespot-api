import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { BrazilianState } from "prisma-types/enums";
import { BrandAddressEntityDto } from "src/domain/entities/brand.entity";

export class UpsertBrandAddressResponsibleDto {
  @IsOptional()
  name!: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  role!: string | null;
}

export class CreateBrandAddressDto {
  @IsOptional()
  @IsEnum(BrazilianState)
  state!: BrazilianState | null;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  city!: string | null;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  neighborhood!: string | null;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  street!: string | null;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  number!: string | null;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  complement!: string | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpsertBrandAddressResponsibleDto)
  responsibles!: UpsertBrandAddressResponsibleDto[];
}

export class CreateBrandAddressResponseDto extends BrandAddressEntityDto {}
