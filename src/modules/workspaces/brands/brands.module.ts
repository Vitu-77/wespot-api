import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { StorageService } from "src/infra/storage/storage.service";
import { AuthGuard } from "src/modules/accounts/signin/guards/auth.guard";
import { BrandsController } from "src/modules/workspaces/brands/brands.controller";
import { CreateBrandsService } from "src/modules/workspaces/brands/services/create-brand/create-brand.service";
import { ListWorkspaceBrandsService } from "src/modules/workspaces/brands/services/list-brands/list-brands.service";

@Module({
  imports: [JwtModule],
  controllers: [BrandsController],
  providers: [
    AuthGuard,
    ListWorkspaceBrandsService,
    CreateBrandsService,
    StorageService,
  ],
})
export class BrandsModule {}
