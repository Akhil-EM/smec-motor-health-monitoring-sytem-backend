import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import responseModel from 'src/common/models/api.model';
import { MotorType } from 'src/database/entities/motor-type.entity';
import { existsSync, readFileSync, unlinkSync } from 'fs';
import path, { join } from 'path';
import { MotorDataConfiguration } from 'src/database/entities/motor-data-configuration.entity';
import * as xlsx from 'xlsx';
@Injectable()
export class ExcelService {
  async upload(file: any, motorId: number) {
    try {
      const fileName = file.fileName;
      //check motor exits
      const motorCheck = await MotorType.findOne({
        where: {
          motor_type_id: motorId,
        },
      });

      const filePath = process.env.FILE_PATH + '/' + fileName;

      if (!motorCheck) {
        //remove uploaded file
        await unlinkSync(filePath);
        throw new HttpException('motor type not found', HttpStatus.NOT_FOUND);
      }

      //check format of file
      const excelFile = xlsx.readFile(filePath);
      console.log(excelFormatCheck(excelFile));

      if (!excelFormatCheck(excelFile)) {
        await unlinkSync(filePath);
        throw new HttpException(
          'first row  of sheet must be of following order and titles (sl_no,input_voltage,frequency,rated_current,starting_current,load,rpm,bearing_condition,temperature,vibration)',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }

      //remove old file if exits
      const oldFileCheck = await MotorDataConfiguration.findOne({
        where: {
          motor_type_id: motorId,
        },
      });
      if (oldFileCheck.excel_path) {
        if (existsSync(oldFileCheck.excel_path)) {
          await unlinkSync(oldFileCheck.excel_path);
        }
      }
      // update motor configurations
      await MotorDataConfiguration.update(
        {
          excel_path: filePath,
        },
        {
          where: {
            motor_type_id: motorId,
          },
        },
      );
      return responseModel('file upload success');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async uploadFile(file: any) {
    try {
      const fileName = file.fileName;
      const filePath = join(__dirname, '../../../src/uploads', fileName);

      //check format of file
      const excelFile = xlsx.readFile(filePath);

      if (!excelFormatCheckWithTimestamp(excelFile)) {
        await unlinkSync(filePath);
        throw new HttpException(
          'first row  of sheet must be of following order and titles (sl_no,time_stamp,input_voltage,frequency,rated_current,starting_current,load,rpm,bearing_condition,temperature,vibration)',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }

      const sheets = excelFile.SheetNames;
      const excelData: any = [];

      for (let i = 0; i < sheets.length; i++) {
        const temp: any = xlsx.utils.sheet_to_json(
          excelFile.Sheets[excelFile.SheetNames[i]],
          {
            raw: false,
          },
        );

        for (let m = 0; m < temp.length; m++) {
          temp[m].time_stamp = new Date(temp[m].time_stamp);
          excelData.push(temp[m]);
        }
      }

      // await unlinkSync(filePath);
      return responseModel('excel data', { excelData: excelData });
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async getExcelData(motorId: number) {
    try {
      const motorCheck = await MotorType.findOne({
        where: {
          motor_type_id: motorId,
        },
      });

      if (!motorCheck)
        throw new HttpException('motor type not found', HttpStatus.NOT_FOUND);

      const motorConfig = await MotorDataConfiguration.findOne({
        where: {
          motor_type_id: motorId,
        },
      });
      if (!motorConfig.excel_path)
        throw new HttpException('no excel files found', HttpStatus.NOT_FOUND);

      const filePath = motorConfig.excel_path;
      const file = xlsx.readFile(filePath);
      const sheets = file.SheetNames;
      const excelData: any = [];

      if (!excelFormatCheck(file)) {
        console.log(
          'first row  of sheet must be of following order and titles (sl_no,input_voltage,frequency,,rated_current,starting_current,load,rpm,bearing_condition,temperature,vibration)',
        );
      }

      for (let i = 0; i < sheets.length; i++) {
        const temp = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
        for (let m = 0; m < temp.length; m++) {
          excelData.push(temp[m]);
        }
      }

      return responseModel('excel data', { excelData: excelData });
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

function excelFormatCheck(file: any): boolean {
  if (
    file.Sheets[file.SheetNames[0]].A1.v !== 'sl_no' ||
    file.Sheets[file.SheetNames[0]].B1.v !== 'input_voltage' ||
    file.Sheets[file.SheetNames[0]].C1.v !== 'frequency' ||
    file.Sheets[file.SheetNames[0]].D1.v !== 'rated_current' ||
    file.Sheets[file.SheetNames[0]].E1.v !== 'starting_current' ||
    file.Sheets[file.SheetNames[0]].F1.v !== 'load' ||
    file.Sheets[file.SheetNames[0]].G1.v !== 'rpm' ||
    file.Sheets[file.SheetNames[0]].H1.v !== 'bearing_condition' ||
    file.Sheets[file.SheetNames[0]].I1.v !== 'temperature' ||
    file.Sheets[file.SheetNames[0]].J1.v !== 'vibration'
  ) {
    return false;
  } else {
    return true;
  }
}

function excelFormatCheckWithTimestamp(file: any): boolean {
  if (
    file.Sheets[file.SheetNames[0]].A1.v !== 'sl_no' ||
    file.Sheets[file.SheetNames[0]].B1.v !== 'time_stamp' ||
    file.Sheets[file.SheetNames[0]].C1.v !== 'input_voltage' ||
    file.Sheets[file.SheetNames[0]].D1.v !== 'frequency' ||
    file.Sheets[file.SheetNames[0]].E1.v !== 'rated_current' ||
    file.Sheets[file.SheetNames[0]].F1.v !== 'starting_current' ||
    file.Sheets[file.SheetNames[0]].G1.v !== 'load' ||
    file.Sheets[file.SheetNames[0]].H1.v !== 'rpm' ||
    file.Sheets[file.SheetNames[0]].I1.v !== 'bearing_condition' ||
    file.Sheets[file.SheetNames[0]].J1.v !== 'temperature' ||
    file.Sheets[file.SheetNames[0]].K1.v !== 'vibration'
  ) {
    return false;
  } else {
    return true;
  }
}
