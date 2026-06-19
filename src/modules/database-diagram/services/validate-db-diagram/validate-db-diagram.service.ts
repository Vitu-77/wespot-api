import { Injectable } from '@nestjs/common';
import path from 'node:path';
import { lstat } from 'node:fs/promises';

export const DB_ER_FILE_PATH = path.join(process.cwd(), 'docs', 'db-er.svg');

@Injectable()
export class ValidateDbDiagramService {
  async execute(): Promise<boolean> {
    try {
      await lstat(DB_ER_FILE_PATH);
      return true;
    } catch {
      return false;
    }
  }
}
