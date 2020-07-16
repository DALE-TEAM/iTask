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
      const user_email_google=result.email;
      const user_name_google=result.givenName;
      const user_lastname_google=result.familyName;
      console.log(user_email_google, user_name_google, user_lastname_google);
      this.loggedIn$.next(true);
      this.regUser_Google(user_email_google, user_name_google, user_lastname_google).subscribe(token => {
        console.log(token);
        localStorage.setItem('token', token);
        console.log(localStorage.getItem('token'));
      });
    })
  }

  regUser_Google( email: any, name: any, lastname: any): Observable<string> {
    return this.http.post< { token : string } >(`${this.url}/regUserG.php`, {email, name, lastname}).pipe(
      map(response => response.token)
    );
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
