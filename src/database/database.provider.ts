import { Sequelize } from 'sequelize-typescript';
import { MotorDataConfiguration } from './entities/motor-data-configuration.entity';
import { MotorData } from './entities/motor-data.entity';
import { MotorTolerance } from './entities/motor-tolerance.entity';
import { MotorType } from './entities/motor-type.entity';
import * as dotenv from 'dotenv';
dotenv.config();
export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  logging(sql, timing) {
    // console.log(
    //   `*********** sql log @ ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} ***********\n\n`,
    //   sql,
    //   '\n\n*******************************************************',
    // );
  },
  timezone: '+05:30',
  // logging: false,
});

export const databaseProvider = [
  {
    provide: 'SEQUALIZE',
    useFactory: async () => {
      try {
        sequelize.addModels([
          MotorType,
          MotorData,
          MotorDataConfiguration,
          MotorTolerance,
        ]);

        await sequelize.authenticate();
        console.log('successfully connected with database...');
        // await sequelize.sync({ force: true });
        // console.log('database sync success');
      } catch (error) {
        console.log(error);
        console.log('database connection error : ', error.message);
      }
    },
  },
];
