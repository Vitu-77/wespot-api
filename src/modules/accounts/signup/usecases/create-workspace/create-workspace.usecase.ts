import { Injectable } from "@nestjs/common";
import { remove as removeAccents } from "remove-accents";
import { WorkspaceRepository } from "src/infra/database/repositories/workspace-repository/workspace.repository";
import { StorageService } from "src/infra/storage/storage.service";
import { CreateWorkspaceDto } from "src/modules/accounts/signup/usecases/create-workspace/create-workspace.dto";
import { S3_BUCKETS } from "src/shared/constants/s3-buckets";

@Injectable()
export class CreateWorkspaceUseCase {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly storageService: StorageService,
  ) {}

  async execute({ type, name }: CreateWorkspaceDto) {
    const slug = this.createSlug(name);
    const workspace = await this.workspaceRepository.create({
      name,
      type,
      slug,
    });

    const commonBuckets = [S3_BUCKETS.SOUNDTRACKS];
    const buckets = Object.values(S3_BUCKETS).filter(
      (bucket) => !commonBuckets.includes(bucket),
    );

    for (const key of buckets) {
      await this.storageService.createDirectory({
        bucket: key as keyof typeof S3_BUCKETS,
        directory: `${slug}__${workspace.id}`,
      });
    }

    return workspace;
  }

  private createSlug(name: string | null) {
    return name
      ? removeAccents(name)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "_")
          .replace(/^_+|_+$/g, "")
      : "";
  }
}
