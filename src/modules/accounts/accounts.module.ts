import { Module } from "@nestjs/common";
import { SigninModule } from "src/modules/accounts/signin/signin.module";
import { SignupModule } from "src/modules/accounts/signup/signup.module";

@Module({
  imports: [SigninModule, SignupModule],
  exports: [],
})
export class AccountsModule {}
