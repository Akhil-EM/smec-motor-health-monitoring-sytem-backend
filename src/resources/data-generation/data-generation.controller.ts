import { Controller, Post, Param, ParseIntPipe } from '@nestjs/common';
import { CronJobService } from 'src/common/helpers/cron-job.service';
import { DataGenerationService } from './data-generation.service';
import { DataGenerationDto } from './dto/data-generation.dto';

@Controller('data-generation')
export class DataGenerationController {
  constructor(private readonly dataGenerationService: DataGenerationService) {}

  @Post(':motorId/:action')
  stopOrGenerateData(@Param() params: DataGenerationDto) {
    return this.dataGenerationService.stopOrGenerateData(
      params.motorId,
      params.action,
    );
  }
}
