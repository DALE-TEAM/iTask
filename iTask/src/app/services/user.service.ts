import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { User } from '../model/user.model';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private authToken: string;
  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private utente$: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);

  private url = 'http://localhost:8888/iTaskServer/api/user';
  
  constructor(private http: HttpClient, private storage: Storage) { 
   this.storage.get('token').then((token)=>{
     this.authToken = token;
     if(token !== null && token !== undefined && token !== ''){
       this.loggedIn$.next(true);
     }
   });
  }


 
  login(credentials: User): Observable<string> {
    return this.http.post< { token : string } >(`${this.url}/login.php`, credentials).pipe(
      map(response => response.token)
    );
  }

  register(user: User) {
    return this.http.post(`${this.url}/register.php`, user);
  }
  
  isLogged(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }
}
