import { Controller, Get, Query } from '@nestjs/common';
import { ListSpotsDto } from 'src/modules/spots/services/list-spots/list-spots.dto';
import { ListSpotsService } from 'src/modules/spots/services/list-spots/list-spots.service';

@Controller('spots')
export class SpotsController {
  constructor(private readonly listSpotsService: ListSpotsService) {}

  @Get('/')
  listSpots(@Query() query: ListSpotsDto) {
    return this.listSpotsService.execute(query);
  }
}
