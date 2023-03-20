import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import responseModel from 'src/common/models/api.model';
import { MotorData } from 'src/database/entities/motor-data.entity';
import { MotorTolerance } from 'src/database/entities/motor-tolerance.entity';
import { MotorType } from 'src/database/entities/motor-type.entity';
import { GetGraphDto } from './dto/get-graph.dto';

@Injectable()
export class GraphsService {
  async getData(motorPrams: GetGraphDto) {
    try {
      const testCondition: any = {
        attributes: ['*'],
        where: {
          motor_type_id: motorPrams.motorId,
        },
        raw: true,
      };

      const toleranceCondition: any = {
        where: {
          motor_type_id: motorPrams.motorId,
        },
        raw: true,
        attributes: [],
      };

      const meanValueCondition = {
        where: {
          motor_type_id: motorPrams.motorId,
        },
        raw: true,
        attributes: [],
      };
      switch (motorPrams.parameter) {
        case 'input-voltage':
          testCondition.attributes.push('motor_data_input_voltage');
          toleranceCondition.attributes.push('motor_tolerance_input_voltage');
          meanValueCondition.attributes.push('motor_type_input_voltage');
          break;
        case 'frequency':
          testCondition.attributes.push('motor_data_frequency');
          toleranceCondition.attributes.push('motor_tolerance_frequency');
          meanValueCondition.attributes.push('motor_type_frequency');
          break;
        case 'rated-current':
          testCondition.attributes.push('motor_data_rated_current');
          toleranceCondition.attributes.push('motor_tolerance_rated_current');
          meanValueCondition.attributes.push('motor_type_rated_current');
          break;
        case 'starting-current':
          testCondition.attributes.push('motor_data_starting_current');
          toleranceCondition.attributes.push(
            'motor_tolerance_starting_current',
          );
          meanValueCondition.attributes.push('motor_type_starting_current');
          break;
        case 'load':
          testCondition.attributes.push('motor_data_load');
          toleranceCondition.attributes.push('motor_tolerance_load');
          meanValueCondition.attributes.push('motor_type_load');
          break;
        case 'rpm':
          testCondition.attributes.push('motor_data_rpm');
          toleranceCondition.attributes.push('motor_tolerance_rpm');
          meanValueCondition.attributes.push('motor_type_rpm');
          break;
        case 'bearing-condition':
          testCondition.attributes.push('motor_data_bearing_condition');
          toleranceCondition.attributes.push(
            'motor_tolerance_bearing_condition',
          );
          meanValueCondition.attributes.push('motor_type_bearing_condition');
          break;
        case 'temperature':
          testCondition.attributes.push('motor_data_temperature');
          toleranceCondition.attributes.push('motor_tolerance_temperature');
          meanValueCondition.attributes.push('motor_type_temperature');
          break;
        case 'vibration':
          testCondition.attributes.push('motor_data_vibration');
          toleranceCondition.attributes.push('motor_tolerance_vibration');
          meanValueCondition.attributes.push('motor_type_vibration');
      }
      const graphData = await MotorData.findAll(testCondition);
      const tolerance = await MotorTolerance.findOne(toleranceCondition);
      const meanValue = await MotorType.findOne(meanValueCondition);

      return responseModel('motor data', {
        graphData: graphData,
        tolerances: Object.values(tolerance)[0], //access first element
        meanValue: Object.values(meanValue)[0],
      });
    } catch (error) {
      console.log(error);

      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
