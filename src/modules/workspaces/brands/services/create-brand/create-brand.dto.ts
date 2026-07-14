import { ApiProperty } from "@nestjs/swagger";
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
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty({ enum: BusinessSegment })
  @IsEnum(BusinessSegment)
  segment!: BusinessSegment;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  description?: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  slogan?: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  phoneNumber?: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  whatsapp?: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  instagram?: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  tiktok?: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  facebook?: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  website?: string | null;

  @ApiProperty({ type: CreateBrandAddressDto, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBrandAddressDto)
  addresses!: CreateBrandAddressDto[];
}

export class CreateBrandResponseDto extends BrandEntityDto {}
