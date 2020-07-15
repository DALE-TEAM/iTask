import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Reminder } from "../model/reminder.model";
import {Share} from "../model/share.model";

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RemindersService {
  private url = `http://localhost:8888/iTaskServer/api/reminders`;
  constructor(private http: HttpClient,

  ) { }
  createReminder(reminder: Reminder) {
    return this.http.post<any>(`${this.url}/Reminders.php`, reminder);
  }
  getReminders(id:string){
    return this.http.get<[Reminder]>(this.url + '/Reminders.php' + '?id=' + id);
  }
  getRemindersById(id:string){
    return this.http.get<[Reminder]>(this.url + '/Reminders.php' + '?idR=' + id);
  }
  deleteReminders(id:string){

    return this.http.delete(this.url + '/Reminders.php' + '?id=' + id);

  }
  updateReminder(reminder: Reminder){
    // @ts-ignore


    // @ts-ignore
    return this.http.post(`${this.url}/updateReminder.php`, reminder);
  }
  shareReminder(dati: Share){
    return this.http.post<any>(`${this.url}/shareReminder.php`,dati );
  }
  getSharedUser(idrem:any){
    return this.http.get<any>(this.url + '/shareReminder.php' + '?id=' + idrem);
  }


  searchR(search: string){
    return this.http.get(`${this.url}/searchR.php`+'?word='+ search);
  }
}
