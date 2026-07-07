import { Module } from '@nestjs/common'
import { DatabaseDiagramController } from 'src/modules/database-diagram/controllers/database-diagram.controller'
import { GetDbDiagramService } from 'src/modules/database-diagram/services/get-db-diagram/get-er-diagram.service'
import { ValidateDbDiagramService } from 'src/modules/database-diagram/services/validate-db-diagram/validate-db-diagram.service'

@Module({
  imports: [],
  controllers: [DatabaseDiagramController],
  providers: [GetDbDiagramService, ValidateDbDiagramService],
})
export class DatabaseDiagramModule {}
