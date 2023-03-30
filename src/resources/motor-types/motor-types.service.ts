import {
  ConflictException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import responseModel from 'src/common/models/api.model';
import { MotorDataConfiguration } from 'src/database/entities/motor-data-configuration.entity';
import { MotorData } from 'src/database/entities/motor-data.entity';
import { MotorTolerance } from 'src/database/entities/motor-tolerance.entity';
import { MotorType } from 'src/database/entities/motor-type.entity';
import { MotorTypeDto } from './dto/motor-type.dto';
@Injectable()
export class MotorTypesService {
  async create(motorType: MotorTypeDto) {
    try {
      //check already added
      const motorCheck = await MotorType.findOne({
        where: {
          motor_type_name: motorType.name,
        },
      });

      if (motorCheck)
        throw new NotAcceptableException('this motor already added');

      //add new motor
      const { motor_type_id } = await MotorType.create({
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

      //add tolerances
      await MotorTolerance.create({
        motor_type_id: motor_type_id,
        motor_tolerance_bearing_condition: motorType.bearingConditionTolerance,
        motor_tolerance_frequency: motorType.frequencyTolerance,
        motor_tolerance_input_voltage: motorType.inputVoltageTolerance,
        motor_tolerance_load: motorType.loadTolerance,
        motor_tolerance_rated_current: motorType.ratedCurrentTolerance,
        motor_tolerance_rpm: motorType.rpmTolerance,
        motor_tolerance_starting_current: motorType.startingCurrentTolerance,
        motor_tolerance_temperature: motorType.temperatureTolerance,
        motor_tolerance_vibration: motorType.vibrationTolerance,
      });

      return responseModel('new motor type added successfully');
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      const motors: any = await MotorType.findAll({
        raw: true,
        include: [
          {
            model: MotorDataConfiguration,
          },
          {
            model: MotorTolerance,
          },
        ],
      });
      return responseModel('motors', { motors: motors });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      const motor: any = await MotorType.findOne({
        where: {
          motor_type_id: id,
        },
        raw: true,
        include: {
          model: MotorTolerance,
        },
      });
      return responseModel('motor', { motor: motor });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, motorType: MotorTypeDto) {
    try {
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

      //update motor tolerance
      await MotorTolerance.update(
        {
          motor_tolerance_bearing_condition:
            motorType.bearingConditionTolerance,
          motor_tolerance_frequency: motorType.frequencyTolerance,
          motor_tolerance_input_voltage: motorType.inputVoltageTolerance,
          motor_tolerance_load: motorType.loadTolerance,
          motor_tolerance_rated_current: motorType.ratedCurrentTolerance,
          motor_tolerance_rpm: motorType.rpmTolerance,
          motor_tolerance_starting_current: motorType.startingCurrentTolerance,
          motor_tolerance_temperature: motorType.temperatureTolerance,
          motor_tolerance_vibration: motorType.vibrationTolerance,
        },
        {
          where: {
            motor_type_id: id,
          },
        },
      );

      return responseModel('motor details edited');
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      //check any dependencies
      const motorDataConfigurationsCheck = await MotorDataConfiguration.findOne(
        {
          where: {
            motor_type_id: id,
          },
        },
      );
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

      if (motorDataConfigurationsCheck || motorDataCheck)
        throw new ConflictException(
          'data associated with  this motor , unable to remove',
        );

      await MotorTolerance.destroy({
        where: {
          motor_type_id: id,
        },
      });
      await MotorType.destroy({
        where: {
          motor_type_id: id,
        },
      });

      return responseModel(`motor type removed successfully.`);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
