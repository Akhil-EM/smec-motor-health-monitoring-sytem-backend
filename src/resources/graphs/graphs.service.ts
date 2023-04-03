import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import responseModel from 'src/common/models/api.model';
import { MotorData } from 'src/database/entities/motor-data.entity';
import { GetGraphDto } from './dto/get-graph.dto';
import { sequelize } from 'src/database/database.provider';
import { MotorType } from 'src/database/entities/motor-type.entity';
import { MotorTolerance } from 'src/database/entities/motor-tolerance.entity';
import { ParamsDto } from './dto/params.dto';
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
        const [data, meta] = await sequelize.query(`
          SELECT ${condition.attributes.join(',')}
          FROM motor_data 
          WHERE motor_data_created_at <= "${date}"`);
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
function getSelectCondition(motorId: number, parameter: string): any {
  const motorCondition = !motorId ? {} : { motor_type_id: motorId };
  const testCondition: any = {
    attributes: [
      '*',
      'motor_type_id',
      'motor_data_id',
      'motor_data_created_at',
    ],
    where: motorCondition,
    order: [['motor_data_created_at', 'DESC']],
    raw: true,
  };

  const removeArrayElement = (element) =>
    testCondition.attributes.filter((attribute) => attribute !== element); //removes * from array

  switch (parameter) {
    case 'input-voltage':
      testCondition.attributes = removeArrayElement('*');
      testCondition.attributes.push('motor_data_input_voltage');
      break;
    case 'frequency':
      testCondition.attributes = removeArrayElement('*');
      testCondition.attributes.push('motor_data_frequency');
      break;
    case 'rated-current':
      testCondition.attributes = removeArrayElement('*');
      testCondition.attributes.push('motor_data_rated_current');
      break;
    case 'starting-current':
      testCondition.attributes = removeArrayElement('*');
      testCondition.attributes.push('motor_data_starting_current');
      break;
    case 'load':
      testCondition.attributes = removeArrayElement('*');
      testCondition.attributes.push('motor_data_load');
      break;
    case 'rpm':
      testCondition.attributes = removeArrayElement('*');
      testCondition.attributes.push('motor_data_rpm');
      break;
    case 'bearing-condition':
      testCondition.attributes = removeArrayElement('*');
      testCondition.attributes.push('motor_data_bearing_condition');
      break;
    case 'temperature':
      testCondition.attributes = removeArrayElement('*');
      testCondition.attributes.push('motor_data_temperature');
      break;
    case 'vibration':
      testCondition.attributes = removeArrayElement('*');
      testCondition.attributes.push('motor_data_vibration');
  }
  return testCondition;
}
