import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasOne,
} from 'sequelize-typescript';
import { MotorDataConfiguration } from './motor-data-configuration.entity';
@Table({ tableName: 'motor-types' })
export class MotorType extends Model<MotorType> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public motor_type_id: number;

  @Column({
    allowNull: false,
  })
  motor_type_name: string;

  @Column({
    allowNull: true,
  })
  motor_type_remarks: string;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  motor_type_input_voltage: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  motor_type_frequency: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  motor_type_rated_current: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  motor_type_starting_current: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  motor_type_load: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  motor_type_rpm: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  motor_type_bearing_condition: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  motor_type_temperature: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  motor_type_vibration: number;

  @HasOne(() => MotorDataConfiguration)
  motorDataConfiguration: MotorDataConfiguration;

  @CreatedAt public motor_type_created_at: Date;

  @UpdatedAt public motor_type_updated_at: Date;
}
