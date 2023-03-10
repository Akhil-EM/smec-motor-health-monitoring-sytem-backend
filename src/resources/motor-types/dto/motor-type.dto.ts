import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsNumber,
} from 'class-validator';
export class MotorTypeDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  public name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  public remarks: string;

  @IsNotEmpty()
  @IsNumber()
  public inputVoltage: number;

  @IsNotEmpty()
  @IsNumber()
  public frequency: number;

  @IsNotEmpty()
  @IsNumber()
  public ratedCurrent: number;

  @IsNotEmpty()
  @IsNumber()
  public startingCurrent: number;

  @IsNotEmpty()
  @IsNumber()
  public load: number;

  @IsNotEmpty()
  @IsNumber()
  public rpm: number;

  @IsNotEmpty()
  @IsNumber()
  public bearingCondition: number;

  @IsNotEmpty()
  @IsNumber()
  public temperature: number;

  @IsNotEmpty()
  @IsNumber()
  public vibration: number;
}
