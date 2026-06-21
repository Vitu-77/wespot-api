import { Body, Controller, Delete, Get, Query } from '@nestjs/common';
import { DeleteSpotsDto } from 'src/modules/spots/services/delete-spots/delete-spots.dto';
import { DeleteSpotsService } from 'src/modules/spots/services/delete-spots/delete-spots.service';
import { ListSpotsDto } from 'src/modules/spots/services/list-spots/list-spots.dto';
import { ListSpotsService } from 'src/modules/spots/services/list-spots/list-spots.service';

@Controller('spots')
export class SpotsController {
  constructor(
    private readonly listSpotsService: ListSpotsService,
    private readonly deleteSpotsService: DeleteSpotsService,
  ) {}

  @Get('/')
  listSpots(@Query() query: ListSpotsDto) {
    return this.listSpotsService.execute(query);
  }

  @Delete('/')
  deleteSpots(@Body() body: DeleteSpotsDto) {
    return this.deleteSpotsService.execute({
      ...body,
      session: {} as any,
    });
  }
}
