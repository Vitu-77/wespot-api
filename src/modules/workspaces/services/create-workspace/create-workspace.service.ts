import { Injectable } from '@nestjs/common';
import { remove as removeAccents } from 'remove-accents';
import { WorkspaceRepository } from 'src/infra/database/repositories/workspace-repository/workspace.repository';
import { StorageService } from 'src/infra/storage/storage.service';
import { CreateWorkspaceDto } from 'src/modules/workspaces/services/create-workspace/create-workspace.dto';
import { S3_BUCKETS } from 'src/shared/constants/s3-buckets';

type CreateDirnameParams = {
  name: string | null;
  id: string;
};

@Injectable()
export class CreateWorkspaceService {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly storageService: StorageService,
  ) {}

  async execute({ type, name }: CreateWorkspaceDto) {
    const workspace = await this.workspaceRepository.create({
      name,
      type,
    });

    const commonBuckets = [S3_BUCKETS.SOUNDTRACKS];
    const buckets = Object.values(S3_BUCKETS).filter(
      (bucket) => !commonBuckets.includes(bucket),
    );

    for (const key of buckets) {
      await this.storageService.createDirectory({
        bucket: key as keyof typeof S3_BUCKETS,
        directory: this.createDirname({ id: workspace.id, name }),
      });
    }

    return workspace;
  }

  private createDirname({ id, name }: CreateDirnameParams) {
    const slug = name
      ? removeAccents(name)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '_')
          .replace(/^_+|_+$/g, '')
      : '';

    return `${slug || 'personal_workspace'}__${id}`;
  }
}
