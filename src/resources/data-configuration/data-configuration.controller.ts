import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import responseModel from 'src/common/models/api.model';
import { DataConfigurationService } from './data-configuration.service';
import { DataConfigurationDto } from './dto/data-configuration.dto';

@Controller('data-configurations')
export class DataConfigurationController {
  constructor(
    private readonly dataConfigurationService: DataConfigurationService,
  ) {}

  @Post()
  create(@Body() dataConfigurationDto: DataConfigurationDto) {
    return this.dataConfigurationService.create(dataConfigurationDto);
  }

  @Get()
  findAll() {
    return this.dataConfigurationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.dataConfigurationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() dataConfiguration: DataConfigurationDto,
  ) {
    return this.dataConfigurationService.update(id, dataConfiguration);
  }
}
