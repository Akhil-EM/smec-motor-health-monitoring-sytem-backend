import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
interface DataGeneration {
  motorTypeId: number;
  inputVoltage: number;
  frequency: number;
  ratedCurrent: number;
  startingCurrent: number;
  load: number;
  rpm: number;
  bearingCondition: number;
  temperature: number;
  vibration: number;
}
@Injectable()
export class CronJobService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  addCronJob(cronName: string, milliseconds: number, callback: () => void) {
    const interval = setInterval(callback, milliseconds);
    this.schedulerRegistry.addInterval(cronName, interval);
    console.log(`${cronName} cron job has started`);
  }

  deleteCronJob(cronName: string) {
    if (this.schedulerRegistry.getInterval(cronName)) {
      this.schedulerRegistry.deleteInterval(cronName);
      console.warn(`${cronName} cron job  has removed!`);
    }
  }

  getIntervals() {
    const intervals = this.schedulerRegistry.getIntervals();
    intervals.forEach((key) => console.log(`Interval: ${key}`));
  }
}
