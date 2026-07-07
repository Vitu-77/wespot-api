import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "src/modules/accounts/signin/guards/auth.guard";
import { BrandsController } from "src/modules/workspaces/brands/brands.controller";
import { ListWorkspaceBrandsService } from "src/modules/workspaces/brands/services/list-brands/list-brands.service";

@Module({
  imports: [JwtModule],
  controllers: [BrandsController],
  providers: [AuthGuard, ListWorkspaceBrandsService],
})
export class BrandsModule {}
