import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Task} from "../model/task.model";

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = `http://localhost:8888/iTaskServer/api/task`;
  constructor(private http: HttpClient,

  ) { }

  getTask(id:string){
    return this.http.get<[Task]>(this.url + '/task.php' + '?id=' + id);
  }
  getNumTaskAll(id:string){
    return this.http.get<[string]>(this.url + '/numTaskByUser.php' + '?idAll=' + id);
  }
  getNumTaskToday(id:string){
    return this.http.get<[string]>(this.url + '/numTaskByUser.php' + '?idToday=' + id);
  }
  getNumTaskFavorite(id:string){
    return this.http.get<[string]>(this.url + '/numTaskByUser.php' + '?idFavorite=' + id);
  }
  getAllTask(id:string){
    return this.http.get<[Task]>(this.url + '/taskByUser.php' + '?idAll=' + id);
  }
  getTodayTask(id:string){
    return this.http.get<[Task]>(this.url + '/taskByUser.php' + '?idToday=' + id);
  }
  getFavoriteTask(id:string){
    return this.http.get<[Task]>(this.url + '/taskByUser.php' + '?idFavorite=' + id);
  }



  setDone(idTdone:string){
    return this.http.get(this.url + '/task.php' + '?idD=' + idTdone);
  }
  setPending(idTpending:string){
    return this.http.get(this.url + '/task.php' + '?idP=' + idTpending);
  }
  alterFavoriteStatus(idTask:any){
    return this.http.get(this.url + '/task.php?idTask='+idTask );

  }

  /*
  deleteReminders(id:string){

    return this.http.delete(this.url + '/Reminders.php' + '?id=' + id);

  }
  */

}