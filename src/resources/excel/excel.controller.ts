import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ExcelService } from './excel.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/config/multer.config';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Post('/:motorId/upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Param('motorId') motorId: number,
  ) {
    return this.excelService.upload(file, motorId);
  }

  @Get('/:motorId')
  getExcelData(@Param('motorId') motorId: number) {
    return this.excelService.getExcelData(motorId);
  }
}
