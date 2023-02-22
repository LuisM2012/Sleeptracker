import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { DailyLog } from 'src/app/data/daily-log';
import { OvernightLog } from 'src/app/data/overnight-log';
import { SleepData } from 'src/app/data/sleep-data';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent implements OnInit {

  logs:any[] = [];
  
  constructor(private storageService:StorageService, private router:Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.ngOnInit()
      }
    })
  }
  
  ngOnInit() {
    this.logs = [];

    this.storageService.getAll(StorageService.NIGHT).then((list) => {
      for (const item of list) {
        var night = new OvernightLog(new Date(), new Date());
        Object.assign(night, item);
        this.logs.push(night);
      }
    })
    this.storageService.getAll(StorageService.DAY).then((list) => {
      for (const item of list) {
        var daily = new DailyLog();
        Object.assign(daily, item);
        this.logs.push(daily);
      }
    })
  }

  logTitle(log:DailyLog | OvernightLog) {
    if (log instanceof DailyLog) {
      return "Sleepiness"
    } else {
      return "Overnight Sleep"
    }
  }

  logData(log:DailyLog | OvernightLog) {
    if (log instanceof DailyLog) {
      return "Average Sleepiness: "+this.estAverage(log);
    } else {
      return `Total Sleep: ${log.totalHours} hrs`;
    }
  }

  logDate(log:DailyLog | OvernightLog) {
    return Intl.DateTimeFormat('en-US').format(new Date(log.date))
  }

  estAverage(dailyLog:DailyLog) {
    let average = 0;
    let count = 0;
    
    for (;count < dailyLog.logs.length; count++)
      average = average+ +dailyLog.logs[count].loggedValue;

    if (count)
      return (average / count).toFixed(1);
    return (average).toFixed(1);
  }

  getLog(log:DailyLog | OvernightLog) {
    if (log instanceof DailyLog) {
      this.router.navigate(['/log', log.id]);
    }
  }

  logIsDaily(log:DailyLog | OvernightLog) {
    return log instanceof DailyLog;
  }

  getSorted() {
    return this.logs.sort((a:SleepData, b:SleepData) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
  }
}
