import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import convertToCamelCase from 'src/common/helpers/data-convert-to-camel-case';
import responseModel from 'src/common/models/api.model';
import { MotorData } from 'src/database/entities/motor-data.entity';
import { GetGraphDto } from './dto/get-graph.dto';

@Injectable()
export class GraphsService {
  async getData(motorPrams: GetGraphDto) {
    try {
      const testCondition: any = {
        attributes: ['motor_data_id', 'motor_type_id', 'motor_data_created_at'],
        where: {
          motor_type_id: motorPrams.motorId,
        },
        raw: true,
      };

      switch (motorPrams.parameter) {
        case 'input-voltage':
          testCondition.attributes.push('motor_data_input_voltage');
          break;
        case 'frequency':
          testCondition.attributes.push('motor_data_frequency');
          break;
        case 'rated-current':
          testCondition.attributes.push('motor_data_rated_current');
          break;
        case 'load':
          testCondition.attributes.push('motor_data_load');
          break;
        case 'rpm':
          testCondition.attributes.push('motor_data_rpm');
          break;
        case 'bearing-condition':
          testCondition.attributes.push('motor_data_bearing_condition');
          break;
        case 'temperature':
          testCondition.attributes.push('motor_data_temperature');
          break;
        case 'vibration':
          testCondition.attributes.push('motor_data_vibration');
      }
      let graphData: any = await MotorData.findAll(testCondition);
      graphData = convertToCamelCase(graphData);

      return responseModel('motor data', { graphData: graphData });
    } catch (error) {
      console.log(error);

      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
