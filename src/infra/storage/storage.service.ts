import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { env } from 'src/env';
import { S3_BUCKETS } from 'src/shared/constants/s3-buckets';

type CreateDirParams = {
  bucket: keyof typeof S3_BUCKETS;
  directory: string;
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
    const key = directory.endsWith('/') ? directory : `${directory}/`;
    await this.s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: '',
      }),
    );
  }
}
