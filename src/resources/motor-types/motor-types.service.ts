import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import responseModel from 'src/common/models/api.model';
import { MotorDataConfiguration } from 'src/database/entities/motor-data-configuration.entity';
import { MotorData } from 'src/database/entities/motor-data.entity';
import { MotorTolerance } from 'src/database/entities/motor-tolerance.entity';
import { MotorType } from 'src/database/entities/motor-type.entity';
import { MotorTypeDto } from './dto/motor-type.dto';
@Injectable()
export class MotorTypesService {
  async create(motorType: MotorTypeDto) {
    //check already added
    const motorCheck = await MotorType.findOne({
      where: {
        motor_type_name: motorType.name,
      },
    });

    if (motorCheck)
      throw new NotAcceptableException('this motor already added');

    //add new motor
    await MotorType.create({
      motor_type_name: motorType.name,
      motor_type_remarks: motorType.remarks,
      motor_type_bearing_condition: motorType.bearingCondition,
      motor_type_vibration: motorType.vibration,
      motor_type_frequency: motorType.frequency,
      motor_type_input_voltage: motorType.inputVoltage,
      motor_type_load: motorType.load,
      motor_type_rated_current: motorType.ratedCurrent,
      motor_type_rpm: motorType.rpm,
      motor_type_starting_current: motorType.startingCurrent,
      motor_type_temperature: motorType.temperature,
    });

    return responseModel('new motor type added successfully');
  }

  async findAll() {
    const motors = await MotorType.findAll({});
    return responseModel('motors', { motors: motors });
  }

  async findOne(id: number) {
    const motor = await MotorType.findOne({
      where: {
        motor_type_id: id,
      },
    });
    return responseModel('motor', { motor: motor });
  }

  async update(id: number, motorType: MotorTypeDto) {
    await MotorType.update(
      {
        motor_type_name: motorType.name,
        motor_type_remarks: motorType.remarks,
        motor_type_bearing_condition: motorType.bearingCondition,
        motor_type_vibration: motorType.vibration,
        motor_type_frequency: motorType.frequency,
        motor_type_input_voltage: motorType.inputVoltage,
        motor_type_load: motorType.load,
        motor_type_rated_current: motorType.ratedCurrent,
        motor_type_rpm: motorType.rpm,
        motor_type_starting_current: motorType.startingCurrent,
        motor_type_temperature: motorType.temperature,
      },
      {
        where: {
          motor_type_id: id,
        },
      },
    );

    return responseModel('motor details edited');
  }

  async remove(id: number) {
    //check any dependencies
    const motorDataConfigurationsCheck = await MotorDataConfiguration.findOne({
      where: {
        motor_type_id: id,
      },
    });
    const motorToleranceCheck = await MotorTolerance.findOne({
      where: {
        motor_type_id: id,
      },
    });
    const motorDataCheck = await MotorData.findOne({
      where: {
        motor_type_id: id,
      },
    });

    if (motorDataConfigurationsCheck || motorToleranceCheck || motorDataCheck)
      throw new ConflictException(
        'data associated with  this motor , unable to remove',
      );

    await MotorType.destroy({
      where: {
        motor_type_id: id,
      },
    });

    return responseModel(`motor type removed successfully.`);
  }
}
