import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
@Table({ tableName: 'motor-data' })
export class MotorData extends Model<MotorData> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public motor_data_id: number;

  @Column({
    allowNull: false,
  })
  motor_type_id: number;

  @Column({
    allowNull: false,
    type: 'FLOAT',
  })
  motor_data_input_voltage: number;

  @Column({
    allowNull: false,
    type: 'FLOAT',
  })
  motor_data_frequency: number;

  @Column({
    allowNull: false,
    type: 'FLOAT',
  })
  motor_data_rated_current: number;

  @Column({
    allowNull: false,
    type: 'FLOAT',
  })
  motor_data_starting_current: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  motor_data_load: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  motor_data_rpm: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  motor_data_bearing_condition: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  motor_data_temperature: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  motor_data_vibration: number;

  @CreatedAt public motor_data_created_at: Date;

  @UpdatedAt public motor_data_updated_at: Date;
}
