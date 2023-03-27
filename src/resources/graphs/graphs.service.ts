import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import responseModel from 'src/common/models/api.model';
import { MotorData } from 'src/database/entities/motor-data.entity';
import { GetGraphDto } from './dto/get-graph.dto';
import { sequelize } from 'src/database/database.provider';
@Injectable()
export class GraphsService {
  async getData(motorPrams: GetGraphDto, date: string) {
    try {
      let graphData: any;

      if (date) {
        const condition = getSelectCondition(
          motorPrams.motorId,
          motorPrams.parameter,
        );

        date = date.replace('T', ' ') + ':59';
        const [data, meta] = await sequelize.query(
          'SELECT ' +
            condition.attributes[0] +
            ',' +
            condition.attributes[1] +
            ' FROM `motor-data` WHERE motor_data_created_at <= "' +
            date +
            '" ORDER BY motor_data_created_at DESC;',
        );
        graphData = data;
      } else {
        graphData = await MotorData.findOne(
          getSelectCondition(motorPrams.motorId, motorPrams.parameter),
        );
      }

      return responseModel('motor data', {
        graphData: graphData,
      });
    } catch (error) {
      console.log(error);

      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

//get select condition based on parameter
function getSelectCondition(motrId: number, parameter: string) {
  const testCondition: any = {
    attributes: ['*', 'motor_data_created_at'],
    where: {
      motor_type_id: motrId,
    },
    order: [['motor_data_created_at', 'DESC']],
    raw: true,
  };

  switch (parameter) {
    case 'input-voltage':
      testCondition.attributes = [];
      testCondition.attributes.push(
        'motor_data_input_voltage',
        'motor_data_created_at',
      );
      break;
    case 'frequency':
      testCondition.attributes = [];
      testCondition.attributes.push(
        'motor_data_frequency',
        'motor_data_created_at',
      );
      break;
    case 'rated-current':
      testCondition.attributes = [];
      testCondition.attributes.push(
        'motor_data_rated_current',
        'motor_data_created_at',
      );
      break;
    case 'starting-current':
      testCondition.attributes = [];
      testCondition.attributes.push(
        'motor_data_starting_current',
        'motor_data_created_at',
      );
      break;
    case 'load':
      testCondition.attributes = [];
      testCondition.attributes.push('motor_data_load', 'motor_data_created_at');
      break;
    case 'rpm':
      testCondition.attributes = [];
      testCondition.attributes.push('motor_data_rpm', 'motor_data_created_at');
      break;
    case 'bearing-condition':
      testCondition.attributes = [];
      testCondition.attributes.push(
        'motor_data_bearing_condition',
        'motor_data_created_at',
      );
      break;
    case 'temperature':
      testCondition.attributes = [];
      testCondition.attributes.push(
        'motor_data_temperature',
        'motor_data_created_at',
      );
      break;
    case 'vibration':
      testCondition.attributes = [];
      testCondition.attributes.push(
        'motor_data_vibration',
        'motor_data_created_at',
      );
  }

  return testCondition;
}
