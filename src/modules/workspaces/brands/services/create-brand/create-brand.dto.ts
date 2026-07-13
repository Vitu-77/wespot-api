import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { BrazilianState, BusinessSegment } from "prisma-types/enums";

export class UpsertBrandAddressResponsibleDto {
  @IsOptional()
  name!: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  role!: string | null;
}

export class UpsertBrandAddressDto {
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

export class CreateBrandDto {
  @IsString()
  name!: string;

  @IsEnum(BusinessSegment)
  segment!: BusinessSegment;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  description?: string | null;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  slogan?: string | null;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  phoneNumber?: string | null;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  whatsapp?: string | null;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  instagram?: string | null;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  tiktok?: string | null;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  facebook?: string | null;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  website?: string | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpsertBrandAddressDto)
  addresses!: UpsertBrandAddressDto[];
}
