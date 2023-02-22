import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { DailyLog } from 'src/app/data/daily-log';
import { OvernightLog } from 'src/app/data/overnight-log';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  dailyLog:DailyLog = new DailyLog();
  overnightLog:OvernightLog = new OvernightLog(new Date(), new Date());

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
    this.storageService.getAll(StorageService.NIGHT).then((list) => {
      for (const item of list) {
        if (item.date == todayDate) {
          Object.assign(this.overnightLog, item);
        }
      }
    })

    // this.storageService.eraseAll();
    // this.storageService.getAll().then((list) => {
    //   console.log(list);
    // })
  }

  estAverage() {
    let average = 0;
    let count = 0;
    
    for (;count < this.dailyLog.logs.length; count++)
      average = average+ +this.dailyLog.logs[count].loggedValue;

    if (count)
      return (average / count).toFixed(1);
    return (average).toFixed(1);
  }
}
