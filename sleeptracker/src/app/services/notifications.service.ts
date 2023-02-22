import { Injectable } from '@angular/core';
import { LocalNotificationDescriptor, LocalNotifications, Schedule } from '@capacitor/local-notifications';


@Injectable({
  providedIn: 'root'
})

export class NotificationsService {

  private static ID:number = 0;

  constructor() { }

  async hasPermission() {
    let permStatus = await LocalNotifications.checkPermissions();
    
    return (permStatus.display === 'granted')
  }
  
  async getPermission() {
    let permStatus = await LocalNotifications.requestPermissions();

    return (permStatus.display === 'granted');
  }

  /**
   * Set a notification schedule to send
   * to the user.
   * 
   * @param schedule - create an object reference with a key 
   * of either (every:ScheduleEvery, on:ScheduleOn, at:Date).
   * For (every:ScheduleEvery) include an optional key of (count:number).
   * For (at:Date) include an optional key of (repeats:boolean).
   * @param title 
   * @param body 
   */
  async setNotificationSchedule(schedule: Schedule, title: string, body: string = "") {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: NotificationsService.ID++,
          title: title,
          body: body,
          schedule: schedule,
          ongoing: true,
        },
      ]
    })
  }
  
  async getScheduled() {
    return await LocalNotifications.getPending();
  }
  
  async removedScheduled(list:LocalNotificationDescriptor[]) {
    return await LocalNotifications.cancel({
      notifications: list,
    })
  }
  
  async sendNotification(title: string, body: string = "") {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: NotificationsService.ID++,
          title: title,
          body: body,
        },
      ]
    })
  }
}
