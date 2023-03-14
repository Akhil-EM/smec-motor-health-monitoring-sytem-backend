import { IsNotEmpty, IsNumber, IsIn, IsString } from 'class-validator';
export class DataGenerationDto {
  @IsString()
  public motorId: string;

  @IsString()
  @IsIn(['start', 'stop'])
  public action: string;
}
