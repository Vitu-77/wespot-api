import { OmitType } from "@nestjs/swagger";
import { BrandEntityDto } from "src/domain/entities/brand.entity";
import { CreateBrandDto } from "src/modules/workspaces/brands/services/create-brand/create-brand.dto";

export class UpdateBrandDto extends OmitType(CreateBrandDto, ["addresses"]) {}

export class UpdateBrandResponseDto extends BrandEntityDto {}
