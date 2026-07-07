import { BrazilianState, BusinessSegment } from 'prisma-types/enums'
import { BaseEntity } from 'src/domain/entities/base.entity'
import { SpotEntity } from 'src/domain/entities/spot.entity'
import { WorkspaceEntity } from 'src/domain/entities/workspace.entity'

export type BrandEntity = BaseEntity & {
  name: string
  segment: BusinessSegment
  responsible: string | null
  description: string | null
  logoUrl: string | null
  slogan: string | null
  phoneNumber: string | null
  whatsapp: string | null
  instagram: string | null
  tiktok: string | null
  facebook: string | null
  website: string | null

  spots?: SpotEntity[]
  addresses?: BrandAddressEntity[]

  workspaceId: string
  workspace?: WorkspaceEntity
}

export type BrandAddressEntity = {
  id: string
  state: BrazilianState | null
  city: string | null
  neighborhood: string | null
  street: string | null
  number: string | null
  complement: string | null

  brandId: string
  brand?: BrandEntity

  responsibles?: BrandResponsibleEntity[]
}

export type BrandResponsibleEntity = {
  id: string
  name: BrazilianState | null
  role?: string

  brandAddressId: string
  brandAddress?: BrandAddressEntity
}
