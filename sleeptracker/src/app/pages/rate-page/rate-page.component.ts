import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DailyLog } from 'src/app/data/daily-log';
import { SleepinessLog } from 'src/app/data/sleepiness-log';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-rate-page',
  templateUrl: './rate-page.component.html',
  styleUrls: ['./rate-page.component.scss'],
})
export class RatePageComponent implements OnInit {

  rating = SleepinessLog.ScaleValues;
  dailyLog:DailyLog = new DailyLog();
  score:any;
  notes:any;

  constructor(private storageService:StorageService, private router:Router) {
    let todayDate = new Date().toDateString();

    this.storageService.getAll(StorageService.DAY).then((list) => {
      for (const item of list) {
        if (item.date == todayDate) {
          Object.assign(this.dailyLog, item);
        }
      }
    })
  }
  
  ngOnInit() { }
  
  addRate() {
    if (this.score) {
      let log = new SleepinessLog(this.score);
      if (this.notes) {
        log.setNote(this.notes);
      }
      
      this.dailyLog.logs.push(log);
      this.storageService.setData(StorageService.DAY+this.dailyLog.id, this.dailyLog);
      
      this.score = null;
      this.notes = null;

      this.router.navigate(['daily']);
    }
  }
}
