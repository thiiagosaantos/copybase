import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    let metricsData;
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      metricsData = await this.uploadService.processExcelFile(file.buffer);
    } else if (file.mimetype === 'text/csv') {
      metricsData = await this.uploadService.processCsvFile(file.buffer);
    } else {
      throw new Error('Tipo de arquivo não suportado');
    }

    return metricsData;
  }
}
