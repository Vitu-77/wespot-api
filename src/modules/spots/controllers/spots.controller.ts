import { Body, Controller, Delete, Get, Query } from '@nestjs/common';
import { DeleteSpotsDto } from 'src/modules/spots/services/delete-spots/delete-spots.dto';
import { DeleteSpotsService } from 'src/modules/spots/services/delete-spots/delete-spots.service';
import { ListSpotsDto } from 'src/modules/spots/services/list-spots/list-spots.dto';
import { ListSpotsService } from 'src/modules/spots/services/list-spots/list-spots.service';
import { CurrentUserId } from 'src/shared/decorators/current-user-id.decorator';
import { CurrentWorkspaceId } from 'src/shared/decorators/current-workspace-id.decorator';

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
  deleteSpots(
    @Body() body: DeleteSpotsDto,
    @CurrentUserId() userId: string,
    @CurrentWorkspaceId() workspaceId: string,
  ) {
    return this.deleteSpotsService.execute({
      ...body,
      userId,
      workspaceId,
    });
  }
}
