import { Module } from '@nestjs/common';
import { DataGenerationService } from './data-generation.service';
import { DataGenerationController } from './data-generation.controller';
import { CronJobService } from 'src/common/helpers/cron-job.service';

@Module({
  controllers: [DataGenerationController],
  providers: [CronJobService, DataGenerationService],
})
export class DataGenerationModule {}
