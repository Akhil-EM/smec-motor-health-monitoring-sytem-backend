import { IsNotEmpty, IsNumber, IsIn, IsString } from 'class-validator';
export class GetGraphDto {
  @IsString()
  public motorId: number;

  @IsString()
  @IsIn([
    'input-voltage',
    'frequency',
    'rated-current',
    'starting-current',
    'load',
    'rpm',
    'bearing-condition',
    'temperature',
    'vibration',
  ])
  public parameter: string;
}
