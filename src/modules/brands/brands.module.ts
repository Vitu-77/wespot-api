import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { BrandsController } from 'src/modules/brands/controllers/brands.controller';
import { ListWorkspaceBrandsService } from 'src/modules/brands/services/list-brands/list-brands.service';

@Module({
  imports: [AuthModule],
  controllers: [BrandsController],
  providers: [ListWorkspaceBrandsService],
})
export class BrandsModule {}
