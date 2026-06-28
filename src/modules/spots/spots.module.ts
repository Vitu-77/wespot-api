import { Module } from '@nestjs/common';
import { ListSpotsService } from 'src/modules/spots/services/list-spots/list-spots.service';
import { SpotsController } from 'src/modules/spots/controllers/spots.controller';
import { DeleteSpotsService } from 'src/modules/spots/services/delete-spots/delete-spots.service';

@Module({
  imports: [],
  controllers: [SpotsController],
  providers: [ListSpotsService, DeleteSpotsService],
})
export class SpotsModule {}
