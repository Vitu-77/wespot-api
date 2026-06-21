import { Module } from '@nestjs/common';
import { ListSpotsService } from 'src/modules/spots/services/list-spots/list-spots.service';
import { SpotsController } from 'src/modules/spots/controllers/spots.controller';
import { ListSpotsRepository } from 'src/modules/spots/repositories/list-spots.repository';
import { DeleteSpotsService } from 'src/modules/spots/services/delete-spots/delete-spots.service';
import { DeleteSpotsRepository } from 'src/modules/spots/repositories/delete-spots.repository';

@Module({
  imports: [],
  controllers: [SpotsController],
  providers: [
    ListSpotsService,
    ListSpotsRepository,
    DeleteSpotsService,
    DeleteSpotsRepository,
  ],
})
export class SpotsModule {}
