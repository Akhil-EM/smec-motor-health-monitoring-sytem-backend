import { Module } from '@nestjs/common';
import { DataConfigurationService } from './data-configuration.service';
import { DataConfigurationController } from './data-configuration.controller';

@Module({
  controllers: [DataConfigurationController],
  providers: [DataConfigurationService],
})
export class DataConfigurationModule {}
