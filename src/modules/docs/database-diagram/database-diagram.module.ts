import { Module } from "@nestjs/common";
import { DatabaseDiagramController } from "src/modules/docs/database-diagram/database-diagram.controller";
import { GetDbDiagramService } from "src/modules/docs/database-diagram/services/get-db-diagram/get-er-diagram.service";
import { ValidateDbDiagramService } from "src/modules/docs/database-diagram/services/validate-db-diagram/validate-db-diagram.service";

@Module({
  imports: [],
  controllers: [DatabaseDiagramController],
  providers: [GetDbDiagramService, ValidateDbDiagramService],
})
export class DatabaseDiagramModule {}
