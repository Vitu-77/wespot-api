import { Injectable, NotFoundException } from '@nestjs/common';
import {
  DB_ER_FILE_PATH,
  ValidateDbDiagramService,
} from 'src/modules/database-diagram/services/validate-db-diagram/validate-db-diagram.service';

@Injectable()
export class GetDbDiagramService {
  constructor(
    private readonly validateDbDiagramService: ValidateDbDiagramService,
  ) {}

  async execute(): Promise<string> {
    const hasFile = await this.validateDbDiagramService.execute();

    if (!hasFile) {
      throw new NotFoundException(
        'Database diagram was not found. Run pnpm prisma:generate to create it.',
      );
    }

    return DB_ER_FILE_PATH;
  }
}
