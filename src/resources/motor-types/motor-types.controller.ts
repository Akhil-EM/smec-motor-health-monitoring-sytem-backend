import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MotorTypesService } from './motor-types.service';
import { MotorTypeDto } from './dto/motor-type.dto';

@Controller('motor-types')
export class MotorTypesController {
  constructor(private readonly motorTypesService: MotorTypesService) {}

  @Post()
  create(@Body() motorType: MotorTypeDto) {
    return this.motorTypesService.create(motorType);
  }

  @Get()
  findAll() {
    return this.motorTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.motorTypesService.findOne(id);
  }

  @Patch(':id')
  update(@Body() motorType: MotorTypeDto, @Param('id') id: number) {
    return this.motorTypesService.update(id, motorType);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.motorTypesService.remove(id);
  }
}
