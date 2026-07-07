import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "src/modules/accounts/signin/guards/auth.guard";
import { DeleteSpotsService } from "src/modules/workspaces/spots/services/delete-spots/delete-spots.service";
import { ListSpotsService } from "src/modules/workspaces/spots/services/list-spots/list-spots.service";
import { SpotsController } from "src/modules/workspaces/spots/spots.controller";

@Module({
  imports: [JwtModule],
  controllers: [SpotsController],
  providers: [AuthGuard, ListSpotsService, DeleteSpotsService],
})
export class SpotsModule {}
