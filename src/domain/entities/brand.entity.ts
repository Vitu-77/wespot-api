import { ApiProperty } from "@nestjs/swagger";
import { BrazilianState, BusinessSegment } from "prisma-types/enums";
import { BaseEntity, BaseEntityDto } from "src/domain/entities/base.entity";
import { SpotEntity, SpotEntityDto } from "src/domain/entities/spot.entity";
import {
  WorkspaceEntity,
  WorkspaceEntityDto,
} from "src/domain/entities/workspace.entity";

export type BrandAddressEntity = {
  id: string;
  state: BrazilianState | null;
  city: string | null;
  neighborhood: string | null;
  street: string | null;
  number: string | null;
  complement: string | null;

  brandId: string;
  brand?: BrandEntity;

  responsibles?: BrandResponsibleEntity[];
};

export class BrandAddressEntityDto implements BrandAddressEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  state!: BrazilianState | null;

  @ApiProperty({ nullable: true, type: "string" })
  city!: string | null;

  @ApiProperty({ nullable: true, type: "string" })
  neighborhood!: string | null;

  @ApiProperty({ nullable: true, type: "string" })
  street!: string | null;

  @ApiProperty({ nullable: true, type: "string" })
  number!: string | null;

  @ApiProperty({ nullable: true, type: "string" })
  complement!: string | null;

  @ApiProperty()
  brandId!: string;

  @ApiProperty()
  brand?: BrandEntity | undefined;

  @ApiProperty({ type: () => BrandResponsibleEntityDto, isArray: true })
  responsibles?: BrandResponsibleEntity[] | undefined;
}

export type BrandResponsibleEntity = {
  id: string;
  name: string;
  role: string | null;

  brandAddressId: string;
  brandAddress?: BrandAddressEntity;
};

export class BrandResponsibleEntityDto implements BrandResponsibleEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  role!: string | null;

  @ApiProperty()
  brandAddressId!: string;

  @ApiProperty({ type: () => BrandAddressEntityDto })
  brandAddress?: BrandAddressEntity | undefined;
}

export type BrandEntity = BaseEntity & {
  name: string;
  segment: BusinessSegment;
  description: string | null;
  logoKey: string | null;
  slogan: string | null;
  phoneNumber: string | null;
  whatsapp: string | null;
  instagram: string | null;
  tiktok: string | null;
  facebook: string | null;
  website: string | null;

  spots?: SpotEntity[];
  addresses?: BrandAddressEntity[];

  workspaceId: string;
  workspace?: WorkspaceEntity;
};

export class BrandEntityDto extends BaseEntityDto implements BrandEntity {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  segment!: BusinessSegment;

  @ApiProperty({ nullable: true, type: "string" })
  description!: string | null;

  @ApiProperty({ nullable: true, type: "string" })
  logoKey!: string | null;

  @ApiProperty({ nullable: true, type: "string" })
  slogan!: string | null;

  @ApiProperty({ nullable: true, type: "string" })
  phoneNumber!: string | null;

  @ApiProperty({ nullable: true, type: "string" })
  whatsapp!: string | null;

  @ApiProperty({ nullable: true, type: "string" })
  instagram!: string | null;

  @ApiProperty({ nullable: true, type: "string" })
  tiktok!: string | null;

  @ApiProperty({ nullable: true, type: "string" })
  facebook!: string | null;

  @ApiProperty({ nullable: true, type: "string" })
  website!: string | null;

  @ApiProperty({ type: SpotEntityDto, isArray: true })
  spots?: SpotEntity[] | undefined;

  @ApiProperty({ type: BrandAddressEntityDto, isArray: true })
  addresses?: BrandAddressEntity[] | undefined;

  @ApiProperty()
  workspaceId!: string;

  @ApiProperty({ type: WorkspaceEntityDto })
  workspace?: WorkspaceEntity | undefined;
}
