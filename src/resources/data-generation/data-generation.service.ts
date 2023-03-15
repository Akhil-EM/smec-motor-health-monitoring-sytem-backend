import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { CronJobService } from 'src/common/helpers/cron-job.service';
import responseModel from 'src/common/models/api.model';
import { MotorDataConfiguration } from 'src/database/entities/motor-data-configuration.entity';
import { MotorType } from 'src/database/entities/motor-type.entity';
import { literal } from 'sequelize';
import { MotorData } from 'src/database/entities/motor-data.entity';
@Injectable()
export class DataGenerationService {
  constructor(private readonly cronService: CronJobService) {}
  async stopOrGenerateData(motorId: string, action: string) {
    try {
      const dataConfigurations = await MotorDataConfiguration.findOne({
        where: {
          motor_type_id: motorId,
        },
        include: {
          model: MotorType,
        },
        raw: true,
      });

      if (action === 'start') {
        //update data configuration
        await MotorDataConfiguration.update(
          { motor_data_generation_started: true },
          {
            where: {
              motor_type_id: motorId,
            },
          },
        );
        //start cron job
        const minutes =
          dataConfigurations['motor_data_configuration_interval_minutes'];
        const seconds =
          dataConfigurations['motor_data_configuration_interval_seconds'];
        const interval =
          minutes === 0 ? seconds * 1000 : 60 * minutes * 1000 + seconds * 1000;

        //remove every previous data
        await MotorData.destroy({
          where: {
            motor_type_id: parseInt(motorId),
          },
        });

        const updateData = async () => {
          try {
            //setting starting action
            let updateFunction: (val1: number, val2: number) => number;

            updateFunction =
              dataConfigurations['motor_data_configuration_starting_action'] ===
              'increment'
                ? (val1: number, val2: number) => val1 + val2
                : (val1: number, val2: number) => val1 - val2;

            //get old data count
            const dataCount = await MotorData.count({
              where: {
                motor_type_id: parseInt(motorId),
              },
            });

            // switch after intervals added or not
            if (
              dataConfigurations[
                'motor_data_configuration_switch_after_occurrences'
              ] > 0
            ) {
              //switch action
              if (
                dataCount >=
                dataConfigurations[
                  'motor_data_configuration_switch_after_occurrences'
                ] -
                  1
              ) {
                updateFunction =
                  dataConfigurations[
                    'motor_data_configuration_starting_action'
                  ] === 'increment'
                    ? (val1: number, val2: number) => val1 - val2
                    : (val1: number, val2: number) => val1 + val2;
              }
            }
            //getting last row
            const lastMotorData = await MotorData.findOne({
              where: {
                motor_type_id: parseInt(motorId),
              },
              order: [['motor_data_created_at', 'DESC']],
            });

            await MotorData.create({
              motor_type_id: parseInt(motorId),
              motor_data_bearing_condition: updateFunction(
                dataCount === 0 //if no data generated use motorType mean values
                  ? dataConfigurations['motorType.motor_type_bearing_condition']
                  : lastMotorData.motor_data_bearing_condition,
                dataConfigurations.motor_data_configuration_bearing_condition_unit,
              ),
              motor_data_frequency: updateFunction(
                dataCount === 0
                  ? dataConfigurations['motorType.motor_type_frequency']
                  : lastMotorData.motor_data_frequency,
                dataConfigurations.motor_data_configuration_frequency_unit,
              ),
              motor_data_input_voltage: updateFunction(
                dataCount === 0
                  ? dataConfigurations['motorType.motor_type_input_voltage']
                  : lastMotorData.motor_data_input_voltage,
                dataConfigurations.motor_data_configuration_input_voltage_unit,
              ),
              motor_data_load: updateFunction(
                dataCount === 0
                  ? dataConfigurations['motorType.motor_type_load']
                  : lastMotorData.motor_data_load,
                dataConfigurations.motor_data_configuration_load_unit,
              ),
              motor_data_rated_current: updateFunction(
                dataCount === 0
                  ? dataConfigurations['motorType.motor_type_rated_current']
                  : lastMotorData.motor_data_rated_current,
                dataConfigurations.motor_data_configuration_rated_current_unit,
              ),
              motor_data_rpm: updateFunction(
                dataCount === 0
                  ? dataConfigurations['motorType.motor_type_rpm']
                  : lastMotorData.motor_data_rpm,
                dataConfigurations.motor_data_configuration_rpm_unit,
              ),
              motor_data_starting_current: updateFunction(
                dataCount === 0
                  ? dataConfigurations['motorType.motor_type_starting_current']
                  : lastMotorData.motor_data_starting_current,
                dataConfigurations.motor_data_configuration_starting_current_unit,
              ),
              motor_data_temperature: updateFunction(
                dataCount === 0
                  ? dataConfigurations['motorType.motor_type_temperature']
                  : lastMotorData.motor_data_temperature,
                dataConfigurations.motor_data_configuration_temperature_unit,
              ),
              motor_data_vibration: updateFunction(
                dataCount === 0
                  ? dataConfigurations['motorType.motor_type_vibration']
                  : lastMotorData.motor_data_vibration,
                dataConfigurations.motor_data_configuration_vibration_unit,
              ),
            });
            console.log(
              `running cronjob : ${
                dataConfigurations['motorType.motor_type_name']
              }  @ ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
            );
          } catch (error) {
            console.log('motor data generation error :', error);
          }
        };

        this.cronService.addCronJob(
          dataConfigurations['motorType.motor_type_name'],
          interval,
          updateData,
        );
      } else {
        //update data configuration
        await MotorDataConfiguration.update(
          { motor_data_generation_started: false },
          {
            where: {
              motor_type_id: motorId,
            },
          },
        );
        //stop cron job
        this.cronService.deleteCronJob(
          dataConfigurations['motorType.motor_type_name'],
        );
      }
      return responseModel(`data generation ${action}ed`);
    } catch (error) {
      console.log(error);

      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
