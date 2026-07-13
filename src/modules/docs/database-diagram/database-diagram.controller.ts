import { Controller, Get, Res } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { type Response } from "express";
import { GetDbDiagramService } from "src/modules/docs/database-diagram/services/get-db-diagram/get-er-diagram.service";

@ApiTags("Database Diagram")
@Controller("db-diagram")
export class DatabaseDiagramController {
  constructor(private readonly getDbDiagramService: GetDbDiagramService) {}

  @Get()
  @ApiOkResponse({ type: () => File })
  @ApiOperation({
    summary: "Get diagram",
    description: "Returns ER-Diagram for PostgreSQL database in SVG format.",
  })
  async getDiagram(@Res() res: Response) {
    const diagram = await this.getDbDiagramService.execute();
    return res.sendFile(diagram);
  }
}
