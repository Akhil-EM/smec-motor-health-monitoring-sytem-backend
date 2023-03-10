import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
@Table({ tableName: 'motor-tolerances' })
export class MotorTolerance extends Model<MotorTolerance> {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public motor_tolerance_id: number;

  @Column({
    allowNull: false,
  })
  motor_type_id: number;

  @Column({
    allowNull: false,
  })
  motor_tolerance_input_voltage: number;

  @Column({
    allowNull: false,
  })
  motor_tolerance_frequency: number;

  @Column({
    allowNull: false,
  })
  motor_tolerance_rated_current: number;

  @Column({
    allowNull: false,
  })
  motor_tolerance_starting_current: number;

  @Column({
    allowNull: false,
  })
  motor_tolerance_load: number;

  @Column({
    allowNull: false,
  })
  motor_tolerance_rpm: number;

  @Column({
    allowNull: false,
  })
  motor_tolerance_bearing_condition: number;

  @Column({
    allowNull: false,
  })
  motor_tolerance_temperature: number;

  @Column({
    allowNull: false,
  })
  motor_tolerance_vibration: number;

  @CreatedAt public motor_tolerance_created_at: Date;

  @UpdatedAt public motor_tolerance_updated_at: Date;
}
