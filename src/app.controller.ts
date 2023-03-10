import { Controller, Get } from '@nestjs/common';
import responseModel from './common/models/api.model';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return responseModel('server up and running');
  }
}
