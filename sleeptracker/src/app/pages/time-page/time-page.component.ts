import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OvernightLog } from 'src/app/data/overnight-log';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-time-page',
  templateUrl: './time-page.component.html',
  styleUrls: ['./time-page.component.scss'],
})
export class TimePageComponent implements OnInit {

  public start:any;
  public end:any;
  private overnightLog:OvernightLog = new OvernightLog(new Date(), new Date());
  
  constructor(private storageService:StorageService, private router:Router) {
    let todayDate = new Date().toDateString();

    this.storageService.getAll(StorageService.NIGHT).then((list) => {
      for (const item of list) {
        if (item.date == todayDate) {
          Object.assign(this.overnightLog, item);
        }
      }
    })
  }
  
  ngOnInit() {}
  
  addTime() {
    if (this.start && this.end) {

      this.overnightLog.setNewTime(new Date(this.start), new Date(this.end));
      
      this.storageService.setData(StorageService.NIGHT+this.overnightLog.id, this.overnightLog);

      this.router.navigate(['home']);
    }
  }
}
