import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { StorageService } from "src/infra/storage/storage.service";
import { AuthGuard } from "src/modules/accounts/signin/guards/auth.guard";
import { BrandsController } from "src/modules/workspaces/brands/brands.controller";
import { CreateBrandsService } from "src/modules/workspaces/brands/services/create-brand/create-brand.service";
import { CreateBrandAddressService } from "src/modules/workspaces/brands/services/create-brand-address/create-brand-address.service";
import { DeleteBrandAddressesService } from "src/modules/workspaces/brands/services/delete-brand-addresses/delete-brand-addresses.service";
import { ListBrandsService } from "src/modules/workspaces/brands/services/list-brands/list-brands.service";
import { UpdateBrandsService } from "src/modules/workspaces/brands/services/update-brand/update-brand.service";
import { UpdateBrandAddressService } from "src/modules/workspaces/brands/services/update-brand-address/update-brand-address.service";
import { ValidateBrandNameUseCase } from "src/modules/workspaces/brands/usecases/validate-brand-name/validate-brand-name.usecase";

@Module({
  imports: [JwtModule],
  controllers: [BrandsController],
  providers: [
    AuthGuard,
    StorageService,

    CreateBrandsService,
    UpdateBrandsService,
    CreateBrandAddressService,
    UpdateBrandAddressService,
    DeleteBrandAddressesService,
    ListBrandsService,

    ValidateBrandNameUseCase,
  ],
})
export class BrandsModule {}
