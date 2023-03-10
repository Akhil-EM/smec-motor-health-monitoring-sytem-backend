import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { DatabseModule } from './database/databse.module';
import { MotorTypesModule } from './resources/motor-types/motor-types.module';
import { DataConfigurationModule } from './resources/data-configuration/data-configuration.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabseModule,
    MotorTypesModule,
    DataConfigurationModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ], //globel provides
})
export class AppModule {}
