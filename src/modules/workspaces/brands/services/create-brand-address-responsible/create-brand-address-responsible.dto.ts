import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BrandResponsibleEntityDto } from "src/domain/entities/brand.entity";

export class CreateBrandResponsibleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  role!: string | null;
}

export class CreateBrandResponsibleResponseDto extends BrandResponsibleEntityDto {}
