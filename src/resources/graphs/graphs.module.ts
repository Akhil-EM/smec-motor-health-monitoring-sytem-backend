import { Module } from '@nestjs/common';
import { GraphsService } from './graphs.service';
import { GraphsController } from './graphs.controller';
import { Sequelize } from 'sequelize-typescript';

@Module({
  controllers: [GraphsController],
  providers: [GraphsService],
})
export class GraphsModule {}
