import { Controller, Get, Res } from '@nestjs/common'
import { type Response } from 'express'
import { GetDbDiagramService } from 'src/modules/database-diagram/services/get-db-diagram/get-er-diagram.service'

@Controller('docs/db')
export class DatabaseDiagramController {
  constructor(private readonly getDbDiagramService: GetDbDiagramService) {}

  @Get()
  async getDiagram(@Res() res: Response) {
    const diagram = await this.getDbDiagramService.execute();
    return res.sendFile(diagram);
  }
}
