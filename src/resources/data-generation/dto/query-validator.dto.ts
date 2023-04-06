import { IsIn, IsString } from 'class-validator';
export class QueryValidator {
  @IsString()
  @IsIn(['true', 'false'])
  public useExcel: string;
}
