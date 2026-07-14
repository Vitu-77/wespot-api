import { ApiProperty } from "@nestjs/swagger";
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
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name!: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  role!: string | null;
}

export class CreateBrandAddressDto {
  @ApiProperty({ enum: BrazilianState, required: false, nullable: true })
  @IsOptional()
  @IsEnum(BrazilianState)
  state!: BrazilianState | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  city!: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  neighborhood!: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  street!: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  number!: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  complement!: string | null;

  @ApiProperty({
    type: UpsertBrandAddressResponsibleDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpsertBrandAddressResponsibleDto)
  responsibles!: UpsertBrandAddressResponsibleDto[];
}

export class CreateBrandAddressResponseDto extends BrandAddressEntityDto {}
