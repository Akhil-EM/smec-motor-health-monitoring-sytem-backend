import { Module } from '@nestjs/common';
import { MotorTypesService } from './motor-types.service';
import { MotorTypesController } from './motor-types.controller';

@Module({
  controllers: [MotorTypesController],
  providers: [MotorTypesService],
})
export class MotorTypesModule {}
