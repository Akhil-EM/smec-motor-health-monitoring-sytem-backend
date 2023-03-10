import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
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
  findOne(@Param('id') id: string) {
    return this.dataConfigurationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    // @Body() updateDataConfigurationDto: UpdateDataConfigurationDto,
  ) {
    return this.dataConfigurationService.update(
      +id,
      // updateDataConfigurationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataConfigurationService.remove(+id);
  }
}
