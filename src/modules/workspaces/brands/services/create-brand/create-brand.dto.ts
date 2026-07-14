import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { BusinessSegment } from "prisma-types/enums";
import { BrandEntityDto } from "src/domain/entities/brand.entity";
import { CreateBrandAddressDto } from "src/modules/workspaces/brands/services/create-brand-address/create-brand-address.dto";

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
  @Type(() => CreateBrandAddressDto)
  addresses!: CreateBrandAddressDto[];
}

export class CreateBrandResponseDto extends BrandEntityDto {}
