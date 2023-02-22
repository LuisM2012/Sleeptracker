import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { DailyLog } from 'src/app/data/daily-log';
import { SleepinessLog } from 'src/app/data/sleepiness-log';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-log-page',
  templateUrl: './log-page.component.html',
  styleUrls: ['./log-page.component.scss'],
})
export class LogPageComponent implements OnInit {

  dailyLog:DailyLog = new DailyLog();

  constructor(private storage:StorageService, private route: ActivatedRoute, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.ngOnInit()
      }
    })
  }
  
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.storage.getData(StorageService.DAY+id).then((log) => {
        Object.assign(this.dailyLog, log)
      })
    }
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
