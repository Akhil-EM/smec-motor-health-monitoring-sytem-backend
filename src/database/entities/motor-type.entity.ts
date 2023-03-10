import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
@Table({ tableName: 'motor-types' })
export class MotorType extends Model<MotorType> {
  @Column({
    type: DataType.BIGINT,
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
    allowNull: false,
  })
  motor_type_input_voltage: number;

  @Column({
    allowNull: false,
  })
  motor_type_frequency: number;

  @Column({
    allowNull: false,
  })
  motor_type_rated_current: number;

  @Column({
    allowNull: false,
  })
  motor_type_starting_current: number;

  @Column({
    allowNull: false,
  })
  motor_type_load: number;

  @Column({
    allowNull: false,
  })
  motor_type_rpm: number;

  @Column({
    allowNull: false,
  })
  motor_type_bearing_condition: number;

  @Column({
    allowNull: false,
  })
  motor_type_temperature: number;

  @Column({
    allowNull: false,
  })
  motor_type_vibration: number;

  @CreatedAt public motor_type_created_at: Date;

  @UpdatedAt public motor_type_updated_at: Date;
}
