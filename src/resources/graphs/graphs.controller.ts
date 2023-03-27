import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  Query,
} from '@nestjs/common';
import { GraphsService } from './graphs.service';
import { GetGraphDto } from './dto/get-graph.dto';
import { GetGraphPipe } from 'src/common/pipes/get-graph.pipe';

@Controller('graphs')
export class GraphsController {
  constructor(private readonly graphsService: GraphsService) {}
  @Get(':motorId/:parameter')
  // @UsePipes(new GetGraphPipe())
  findOne(@Param() motorPrams: GetGraphDto, @Query('date') date: string) {
    return this.graphsService.getData(motorPrams, date);
  }
}
