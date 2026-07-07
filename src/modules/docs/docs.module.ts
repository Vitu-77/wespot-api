import { Module } from "@nestjs/common";
import { DatabaseDiagramModule } from "src/modules/docs/database-diagram/database-diagram.module";

@Module({
  imports: [DatabaseDiagramModule],
})
export class DocsModule {}
