import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokensService } from './tokens.service';

@Global()
@Module({
  imports: [],
  providers: [JwtService, TokensService],
  exports: [TokensService],
})
export class TokensModule {}
