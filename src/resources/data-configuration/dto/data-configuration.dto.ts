import {
  IsNotEmpty,
  IsNumber,
  IsIn,
  IsString,
  IsBoolean,
} from 'class-validator';
export class DataConfigurationDto {
  @IsNotEmpty()
  @IsNumber()
  public intervalMinutes: number;

  @IsNotEmpty()
  @IsNumber()
  public intervalSeconds: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(['increment', 'decrement'])
  public startingAction: string;

  @IsNotEmpty()
  @IsNumber()
  public switchAfter: number;

  @IsNotEmpty()
  @IsNumber()
  public motorTypeId: number;

  @IsNotEmpty()
  @IsNumber()
  public inputVoltageUnit: number;

  @IsNotEmpty()
  @IsNumber()
  public frequencyUnit: number;

  @IsNotEmpty()
  @IsNumber()
  public ratedCurrentUnit: number;

  @IsNotEmpty()
  @IsNumber()
  public startingCurrentUnit: number;

  @IsNotEmpty()
  @IsNumber()
  public loadUnit: number;

  @IsNotEmpty()
  @IsNumber()
  public rpmUnit: number;

  @IsNotEmpty()
  @IsNumber()
  public bearingConditionUnit: number;

  @IsNotEmpty()
  @IsNumber()
  public temperatureUnit: number;

  @IsNotEmpty()
  @IsNumber()
  public vibration: number;

  @IsNotEmpty()
  @IsBoolean()
  public useExcel: boolean;
}
