import { extname } from "node:path";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { WorkspaceEntity } from "src/domain/entities/workspace.entity";
import { env } from "src/env";
import { S3_BUCKETS } from "src/shared/constants/s3-buckets";
import { createWorkspaceDirname } from "src/shared/utils/create-workspace-dirname";

type CreateDirParams = {
  bucket: keyof typeof S3_BUCKETS;
  directory: string;
};

type UploadFileParams = {
  bucket: keyof typeof S3_BUCKETS;
  file: MulterFile;
  workspace: WorkspaceEntity;
  prefix?: string;
};

@Injectable()
export class StorageService {
  private readonly s3 = new S3Client({
    region: env.AWS_REGION,

    endpoint: env.AWS_S3_ENDPOINT,

    forcePathStyle: env.AWS_S3_FORCE_PATH_STYLE,

    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  });

  constructor() {}

  async createDirectory({ bucket, directory }: CreateDirParams): Promise<void> {
    const key = directory.endsWith("/") ? directory : `${directory}/`;
    await this.s3.send(
      new PutObjectCommand({
        Bucket: S3_BUCKETS[bucket],
        Key: key,
        Body: "",
      }),
    );
  }

  async upload({ bucket, file, workspace, prefix }: UploadFileParams) {
    const extension = extname(file.originalname);
    const filename = prefix
      ? `${prefix}__${crypto.randomUUID()}`
      : crypto.randomUUID();

    const key = [
      createWorkspaceDirname(workspace),
      `${filename}${extension}`,
    ].join("/");

    await this.s3.send(
      new PutObjectCommand({
        Bucket: S3_BUCKETS[bucket],
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return {
      key,
      bucket: bucket,
    };
  }
}
