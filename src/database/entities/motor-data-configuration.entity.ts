import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { DataType } from 'sequelize';
import { MotorType } from './motor-type.entity';
@Table({ tableName: 'motor-data-configurations' })
export class MotorDataConfiguration extends Model<MotorDataConfiguration> {
  @Column({
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

  @ForeignKey(() => MotorType)
  @Column({
    allowNull: false,
  })
  motor_type_id: number;

  @Column({
    allowNull: false,
    type: 'FLOAT',
  })
  motor_data_configuration_input_voltage_unit: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  motor_data_configuration_frequency_unit: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  motor_data_configuration_rated_current_unit: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  motor_data_configuration_starting_current_unit: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  motor_data_configuration_load_unit: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  motor_data_configuration_rpm_unit: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  motor_data_configuration_bearing_condition_unit: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  motor_data_configuration_temperature_unit: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  motor_data_configuration_vibration_unit: number;

  @Column({
    allowNull: false,
    defaultValue: false,
  })
  motor_data_generation_started: boolean;

  @CreatedAt public motor_data_configuration_created_at: Date;

  @UpdatedAt public motor_data_configuration_updated_at: Date;

  @BelongsTo(() => MotorType)
  motorType: MotorType;
}
