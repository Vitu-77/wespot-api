import { Module } from "@nestjs/common";
import { AuthGuard } from "src/modules/accounts/signin/guards/auth.guard";
import { SubscriptionsController } from "src/modules/workspaces/subscriptions/controllers/subscriptions.controller";

@Module({
  imports: [],
  controllers: [SubscriptionsController],
  providers: [AuthGuard],
})
export class SubscriptionsModule {}
