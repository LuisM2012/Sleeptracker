import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { DailyLog } from 'src/app/data/daily-log';
import { SleepinessLog } from 'src/app/data/sleepiness-log';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-daily-page',
  templateUrl: './daily-page.component.html',
  styleUrls: ['./daily-page.component.scss'],
})
export class DailyPageComponent implements OnInit {

  dailyLog:DailyLog = new DailyLog();

  constructor(private storageService:StorageService, private router:Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.ngOnInit()
      }
    })
  }
  
  ngOnInit() {
    let todayDate = new Date().toDateString();

    this.storageService.getAll(StorageService.DAY).then((list) => {
      for (const item of list) {
        if (item.date == todayDate) {
          Object.assign(this.dailyLog, item);
        }
      }
    })
  }
  
  getSorted() {
    return this.dailyLog.logs.sort((a:SleepinessLog, b:SleepinessLog) => {
      return new Date(b.loggedAt).getTime() - new Date(a.loggedAt).getTime();
    })
  }

  getTime(log:SleepinessLog) {
    return Intl.DateTimeFormat("en-US", 
      {
        hour: 'numeric', 
        minute: 'numeric'
      }).format(new Date(log.loggedAt))
  }
}
