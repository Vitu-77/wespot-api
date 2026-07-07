import { Controller, Get, Res } from "@nestjs/common";
import { type Response } from "express";
import { GetDbDiagramService } from "src/modules/docs/database-diagram/services/get-db-diagram/get-er-diagram.service";

@Controller("docs/db-diagram")
export class DatabaseDiagramController {
  constructor(private readonly getDbDiagramService: GetDbDiagramService) {}

  @Get()
  async getDiagram(@Res() res: Response) {
    const diagram = await this.getDbDiagramService.execute();
    return res.sendFile(diagram);
  }
}
