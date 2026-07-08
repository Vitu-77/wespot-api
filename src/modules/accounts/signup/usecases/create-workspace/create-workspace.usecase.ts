import { BadRequestException, Injectable } from "@nestjs/common";
import { WorkspaceType } from "prisma-types/enums";
import { remove as removeAccents } from "remove-accents";
import { ErrorCodes } from "src/domain/exceptions/error-codes.enum";
import { WorkspaceRepository } from "src/infra/database/repositories/workspace-repository/workspace.repository";
import { StorageService } from "src/infra/storage/storage.service";
import { S3_BUCKETS } from "src/shared/constants/s3-buckets";

type CreateWorkspaceUseCaseParams = {
  type: WorkspaceType;
  name: string;
};

@Injectable()
export class CreateWorkspaceUseCase {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly storageService: StorageService,
  ) {}

  async execute({ type, name }: CreateWorkspaceUseCaseParams) {
    if (type !== "INDIVIDUAL" && !name) {
      throw new BadRequestException(
        "Not individual workspaces need valid names",
        {
          description: ErrorCodes.WORKSPACE_NAME_NOT_PROVIDED,
        },
      );
    }

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
