import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { DatabaseModule } from './database/databse.module';
import { MotorTypesModule } from './resources/motor-types/motor-types.module';
import { DataConfigurationModule } from './resources/data-configuration/data-configuration.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { DataGenerationModule } from './resources/data-generation/data-generation.module';
import { CronJobService } from './common/helpers/cron-job.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    MotorTypesModule,
    DataConfigurationModule,
    DataGenerationModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    CronJobService,
  ], //globel provides
})
export class AppModule {}
