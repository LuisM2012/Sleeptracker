import { SleepData } from "./sleep-data";
import { SleepinessLog } from "./sleepiness-log";

export class DailyLog extends SleepData {

  logs: SleepinessLog[] = [];

  constructor() { 
    super()
  }
}
