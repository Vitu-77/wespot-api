import { Module } from '@nestjs/common';
import { ListSpotsService } from 'src/modules/spots/services/list-spots/list-spots.service';
import { SpotsController } from 'src/modules/spots/controllers/spots.controller';

@Module({
  imports: [],
  controllers: [SpotsController],
  providers: [ListSpotsService],
})
export class SpotsModule {}
