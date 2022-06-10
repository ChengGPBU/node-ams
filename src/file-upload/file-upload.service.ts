import { Injectable } from '@nestjs/common';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { BufferedFile } from 'src/minio-client/file.model';
import { config } from '../config/minio-client'

@Injectable()
export class FileUploadService {
  private readonly baseBucket = config.MINIO_BUCKET

  constructor(private minioClientService: MinioClientService) {}

  async uploadImage(image: BufferedFile) {
    const uploadedImage = await this.minioClientService.upload(image);
    return {
      imageUrl: uploadedImage.url,
    };
  }

  async uploadMany(files: BufferedFile) {
    const image1 = files['image1'][0];
    const uploadedImage1 = await this.minioClientService.upload(image1);
    const image2 = files['image2'][0];
    const uploadedImage2 = await this.minioClientService.upload(image2);
    return {
      image1Url: uploadedImage1.url,
      image2Url: uploadedImage2.url,
    };
  }


  async deleteFile(query: { objetName: string, baseBucket: string }) {
    const { objetName, baseBucket } = query
    await this.minioClientService.delete(objetName, baseBucket);
    return null;
  }
}
