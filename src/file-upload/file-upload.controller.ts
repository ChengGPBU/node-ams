import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  UploadedFiles,
  Get,
  Query,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { BufferedFile } from 'src/minio-client/file.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('file-upload')
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) {}

  @Post('image')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() image: BufferedFile) {
    return await this.fileUploadService.uploadImage(image);
  }

  @Post('many')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image1', maxCount: 1 },
      { name: 'image2', maxCount: 1 },
    ]),
  )
  async uploadMany(@UploadedFiles() files: BufferedFile) {
    return await this.fileUploadService.uploadMany(files);
  }

  @Get('delete')
  @UseGuards(AuthGuard('jwt'))
  async deleteFile(@Query() query) {
    return await this.fileUploadService.deleteFile(query);
  }
}
