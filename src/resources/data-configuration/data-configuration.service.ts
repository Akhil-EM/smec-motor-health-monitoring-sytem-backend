import {
  Injectable,
  NotAcceptableException,
  HttpException,
  HttpStatus,
  ConflictException,
} from '@nestjs/common';
import responseModel from 'src/common/models/api.model';
import { MotorDataConfiguration } from 'src/database/entities/motor-data-configuration.entity';
import { MotorType } from 'src/database/entities/motor-type.entity';
import { DataConfigurationDto } from './dto/data-configuration.dto';
import { literal } from 'sequelize';

@Injectable()
export class DataConfigurationService {
  async create(dataConfiguration: DataConfigurationDto) {
    try {
      //check if the motor exits
      const motorCheck = await MotorType.findOne({
        where: {
          motor_type_id: dataConfiguration.motorTypeId,
        },
      });

      if (!motorCheck) throw new NotAcceptableException('motor type not found');

      //check if data configuration already added
      const dataConfigurationsCheck = await MotorDataConfiguration.findOne({
        where: {
          motor_type_id: dataConfiguration.motorTypeId,
        },
      });

      if (dataConfigurationsCheck)
        throw new HttpException(
          'data configurations already added',
          HttpStatus.CONFLICT,
        );

      const configuration = await MotorDataConfiguration.create({
        motor_type_id: dataConfiguration.motorTypeId,
        motor_data_configuration_interval_minutes:
          dataConfiguration.intervalMinutes,
        motor_data_configuration_interval_seconds:
          dataConfiguration.intervalSeconds,
        motor_data_configuration_starting_action:
          dataConfiguration.startingAction,
        motor_data_configuration_switch_after_occurrences:
          dataConfiguration.switchAfter,
        motor_data_configuration_bearing_condition_unit:
          dataConfiguration.bearingConditionUnit,
        motor_data_configuration_frequency_unit:
          dataConfiguration.frequencyUnit,
        motor_data_configuration_input_voltage_unit:
          dataConfiguration.inputVoltageUnit,
        motor_data_configuration_load_unit: dataConfiguration.loadUnit,
        motor_data_configuration_rated_current_unit:
          dataConfiguration.ratedCurrentUnit,
        motor_data_configuration_rpm_unit: dataConfiguration.rpmUnit,
        motor_data_configuration_starting_current_unit:
          dataConfiguration.startingCurrentUnit,
        motor_data_configuration_temperature_unit:
          dataConfiguration.temperatureUnit,
        motor_data_configuration_vibration_unit: dataConfiguration.vibration,
      });

      return responseModel('data configurations added successfully', {
        configuration,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      const dataConfigurations = await MotorDataConfiguration.findAll({
        include: {
          model: MotorType,
          attributes: ['motor_type_name'],
        },
        raw: true,
      });

      return responseModel('data configurations', {
        dataConfigurations: dataConfigurations,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      const dataConfiguration: any = await MotorDataConfiguration.findOne({
        where: {
          motor_data_configuration_id: id,
        },
        include: {
          model: MotorType,
          attributes: ['motor_type_name'],
        },
        raw: true,
      });
      return responseModel('data configuration', {
        dataConfiguration: dataConfiguration,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, dataConfiguration: DataConfigurationDto) {
    try {
      const motorTypeCheck = await MotorType.findOne({
        where: {
          motor_type_id: dataConfiguration.motorTypeId,
        },
      });

      if (!motorTypeCheck)
        throw new HttpException('motor type not found', HttpStatus.NOT_FOUND);

      await MotorDataConfiguration.update(
        {
          motor_type_id: dataConfiguration.motorTypeId,
          motor_data_configuration_interval_minutes:
            dataConfiguration.intervalMinutes,
          motor_data_configuration_interval_seconds:
            dataConfiguration.intervalSeconds,
          motor_data_configuration_starting_action:
            dataConfiguration.startingAction,
          motor_data_configuration_switch_after_occurrences:
            dataConfiguration.switchAfter,
          motor_data_configuration_bearing_condition_unit:
            dataConfiguration.bearingConditionUnit,
          motor_data_configuration_frequency_unit:
            dataConfiguration.frequencyUnit,
          motor_data_configuration_input_voltage_unit:
            dataConfiguration.inputVoltageUnit,
          motor_data_configuration_load_unit: dataConfiguration.loadUnit,
          motor_data_configuration_rated_current_unit:
            dataConfiguration.ratedCurrentUnit,
          motor_data_configuration_rpm_unit: dataConfiguration.rpmUnit,
          motor_data_configuration_starting_current_unit:
            dataConfiguration.startingCurrentUnit,
          motor_data_configuration_temperature_unit:
            dataConfiguration.temperatureUnit,
          motor_data_configuration_vibration_unit: dataConfiguration.vibration,
        },
        {
          where: {
            motor_data_configuration_id: id,
          },
        },
      );

      return responseModel('data configurations updated successfully');
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
