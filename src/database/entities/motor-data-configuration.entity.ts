import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasOne
} from 'sequelize-typescript';
import { MotorType } from './motor-type.entity';
@Table({ tableName: 'motor-data-configurations' })
export class MotorDataConfiguration extends Model<MotorDataConfiguration> {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public motor_data_configuration_id: number;

  @Column({
    allowNull: false,
  })
  motor_data_configuration_interval_minutes: number;

  @Column({
    allowNull: false,
  })
  motor_data_configuration_interval_seconds: number;

  @Column({
    allowNull: false,
    defaultValue: 'increment',
  })
  motor_data_configuration_starting_action: string;

  @Column({
    allowNull: false,
  })
  motor_data_configuration_switch_after_occurrences: number;

  @Column({
    allowNull: false,
  })
  motor_type_id: number;

  @Column({
    allowNull: false,
  })
  motor_data_configuration_input_voltage_unit: number;

  @Column({
    allowNull: false,
  })
  motor_data_configuration_frequency_unit: number;

  @Column({
    allowNull: false,
  })
  motor_data_configuration_rated_current_unit: number;

  @Column({
    allowNull: false,
  })
  motor_data_configuration_starting_current_unit: number;

  @Column({
    allowNull: false,
  })
  motor_data_configuration_load_unit: number;

  @Column({
    allowNull: false,
  })
  motor_data_configuration_rpm_unit: number;

  @Column({
    allowNull: false,
  })
  motor_data_configuration_bearing_condition_unit: number;

  @Column({
    allowNull: false,
  })
  motor_data_configuration_temperature_unit: number;

  @Column({
    allowNull: false,
  })
  motor_data_configuration_vibration_unit: number;

  @CreatedAt public motor_data_configuration_created_at: Date;

  @UpdatedAt public motor_data_configuration_updated_at: Date;
}
