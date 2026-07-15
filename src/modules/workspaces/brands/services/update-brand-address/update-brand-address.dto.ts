import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsUUID, ValidateNested } from "class-validator";
import { BrandAddressEntityDto } from "src/domain/entities/brand.entity";
import {
  CreateBrandAddressDto,
  CreateBrandAddressResponsibleDto,
} from "src/modules/workspaces/brands/services/create-brand-address/create-brand-address.dto";

export class UpdateBrandAddressResponsibleDto extends CreateBrandAddressResponsibleDto {
  @IsUUID()
  @IsOptional()
  id?: string;
}

export class UpdateBrandAddressDto extends OmitType(CreateBrandAddressDto, [
  "responsibles",
]) {
  @ApiProperty({ type: UpdateBrandAddressResponsibleDto, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateBrandAddressResponsibleDto)
  responsibles!: UpdateBrandAddressResponsibleDto[];
}

export class UpdateBrandAddressResponseDto extends BrandAddressEntityDto {}
