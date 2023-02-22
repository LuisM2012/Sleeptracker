import { Preferences } from '@capacitor/preferences';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  static NOTIFICATION = 'notification-';
  static NIGHT = 'night-';
  static DAY = 'day-';

  constructor() { }

  async setData (id:string, data:any)
  {
    await Preferences.set({
      key: id,
      value: JSON.stringify(data),
    });
  }
  
  async getData (id:string)
  {
    const { value } = await Preferences.get({ 
      key: id 
    });
    
    if (value) {
      return JSON.parse(value);
    }
    
    return null;
  }
  
  async removeData (id:string) 
  {
    await Preferences.remove({ 
      key: id
    });
  }
  
  async getAll (filter:string = '')
  {
    let result:any[] = [];
    
    const {keys} = await Preferences.keys();
    
    for await(const key of keys)
    {
      if (key.includes(filter)) {
        this.getData(key).then((item) => {
          if (item) {
            result.push(item);
          }
        })
      }
    }
    
    return result;
  }
  
  async eraseAll ()
  {
    await Preferences.clear();
  } 
}
