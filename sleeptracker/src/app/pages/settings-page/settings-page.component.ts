import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NotificationsService } from 'src/app/services/notifications.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent implements OnInit {

  hasPermission:boolean = false;
  notificationScheduled:any[] = [];

  constructor(private notificationsService:NotificationsService, 
              private storageService:StorageService,
              private alertController:AlertController) { 
    this.notificationsService.hasPermission().then((value) => { 
      this.hasPermission = value; 
    })
    this.storageService.getAll(StorageService.NOTIFICATION).then((list) => {
      this.notificationScheduled = list;
    })
  }

  ngOnInit() { this.notificationScheduled = [{}] }

  async verifyPermission() {
    if (!this.hasPermission) {
      await this.notificationsService.getPermission().then((value) => {
        this.hasPermission = value;
      })
    }
    return this.hasPermission;
  }

  async scheduleNotification(date: Date) {
    if (await this.verifyPermission()) {
      console.log("scheduled notification")
      this.notificationsService.setNotificationSchedule({
        at: date
      }, "Notification Scheduled", "repeated schedule")
    } else {
      console.log("no permission");
    }
  }
  
  async sendNotification() {
    if (await this.verifyPermission()) {
      this.notificationsService.sendNotification("Sending Notification", "Sending a new notification.")
    } else {
      this.alertPermission();
    }
  }

  async getNotification() {
    console.log((await this.notificationsService.getScheduled()).notifications)
  }

  async alertPermission() {
    const alert = await this.alertController.create({
      header: 'No Permission',
      message: 'Please enable Notifications permission',
      buttons: ['OK'],
    });
    await alert.present();
  }

  toDate () {
    return new Date()
  }
}
