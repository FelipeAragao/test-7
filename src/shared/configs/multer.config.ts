import { ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { S3 } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMulterOptions(): MulterModuleOptions {
    const isS3 =
      this.configService.get<string>('fileUpload.storageDriver') === 's3';

    console.log(`Using ${isS3 ? 'S3' : 'Local'} storage`);

    return {
      storage: isS3
        ? multerS3({
            s3: new S3(),
            bucket: this.configService.get<string>('fileUpload.bucket'),
            acl: 'public-read',
            key: (req, file, cb) => {
              console.log('Uploading to S3 🍿');

              cb(null, `${Date.now().toString()}-${file.originalname}`);
            },
          })
        : diskStorage({
            destination: './uploads', // Local Docker volume storage
            filename: (req, file, cb) => {
              console.log('Uploading to disk 💾');

              cb(null, `${Date.now().toString()}-${file.originalname}`);
            },
          }),
      limits: {
        fileSize:
          this.configService.get<number>('fileUpload.fileSizeLimit') ||
          5 * 1024 * 1024,
        files: this.configService.get<number>('fileUpload.maxCount') || 5,
      },
    };
  }
}
