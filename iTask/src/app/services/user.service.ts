import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import { ToastController, Platform, NavController } from '@ionic/angular';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { User } from '../model/user.model';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

import { GooglePlus } from '@ionic-native/google-plus/ngx';




@Injectable({
  providedIn: 'root'
})

export class UserService {

  private authToken: string;
  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private utente$: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);
  userInfo: any;
  token: any;

  private url = 'http://localhost:8888/iTaskServer/api/user';
  
  constructor(
    private http: HttpClient, 
    private storage: Storage, 
    private google: GooglePlus,  
    private navCtrl: NavController
  ) 
    { 
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

  logout(){
    this.token = null;
    this.loggedIn$.next(false);
    this.storage.remove('token');
    this.storage.remove('user');
    localStorage.removeItem('token');
    this.navCtrl.navigateRoot('/login');
  }

  register(user: User) {
    return this.http.post(`${this.url}/register.php`, user);
  }
  
  isLogged(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  loginGoogle(){
   return this.google.login({}).then(result => {
      const user_data_google = result;
      this.storage.set('userGoogle', user_data_google);
   })
  }

  updateEmail(newUser: User, id: any){
    return this.http.post(`${this.url}/updateEmail.php`+'?id=' + id, newUser);
  }

  updatePass(pass: string, id: any){
    return this.http.post(`${this.url}/updatePass.php`+'?id=' + id, pass);
  }

  deleteAcc(id: string){
    return this.http.delete(`${this.url}/delete.php` + '?user=' + id);
  }

}
