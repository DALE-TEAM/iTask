import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Reminder } from "../model/reminder.model";


import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RemindersService {
  private url = `http://localhost:8888/iTaskServer/api/reminders`;
  constructor(private http: HttpClient,

  ) { }

  getReminders(id:string){
    return this.http.get<[Reminder]>(this.url + '/Reminders.php' + '?id=' + id);
  }
  getRemindersById(id:string){
    return this.http.get<[Reminder]>(this.url + '/Reminders.php' + '?idR=' + id);
  }
  deleteReminders(id:string){

    return this.http.delete(this.url + '/Reminders.php' + '?id=' + id);

  }
}