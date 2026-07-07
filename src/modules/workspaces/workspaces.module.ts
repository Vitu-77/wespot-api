import { Module } from "@nestjs/common";
import { BrandsModule } from "src/modules/workspaces/brands/brands.module";
import { SpotsModule } from "src/modules/workspaces/spots/spots.module";
import { WorkspaceUsersModule } from "src/modules/workspaces/users/users.module";

@Module({
  imports: [WorkspaceUsersModule, BrandsModule, SpotsModule],
})
export class WorkspacesModule {}
