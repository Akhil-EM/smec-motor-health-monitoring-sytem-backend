import { Injectable, NotAcceptableException } from '@nestjs/common';
import responseModel from 'src/common/models/api.model';
import { MotorDataConfiguration } from 'src/database/entities/motor-data-configuration.entity';
import { MotorType } from 'src/database/entities/motor-type.entity';
import { DataConfigurationDto } from './dto/data-configuration.dto';

@Injectable()
export class DataConfigurationService {
  async create(dataConfiguration: DataConfigurationDto) {
    console.log(dataConfiguration);
    //check if the motor exits
    const motorCheck = await MotorType.findOne({
      where: {
        motor_type_id: dataConfiguration.motorTypeId,
      },
    });

    if (!motorCheck) throw new NotAcceptableException('motor type not found');

    await MotorDataConfiguration.create({
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
      motor_data_configuration_frequency_unit: dataConfiguration.frequencyUnit,
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

    return responseModel('data configurations added successfully');
  }

  async findAll() {
    const dataConfigurations = await MotorDataConfiguration.findAll({
      // include: MotorType,
    });
    return responseModel('data configurations', {
      dataConfigurations: dataConfigurations,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} dataConfiguration`;
  }

  update(id: number) {
    return `This action updates a #${id} dataConfiguration`;
  }

  remove(id: number) {
    return `This action removes a #${id} dataConfiguration`;
  }
}
