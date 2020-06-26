import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, NavController, LoadingController} from '@ionic/angular';
import {HttpErrorResponse} from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user.model';
import {Storage} from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loginForm: FormGroup;
  isloggin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private storage: Storage,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,        
    private navCtrl: NavController,
    private UserSrv: UserService){}
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    });
  }
  
  async login(){
    const loading = await this.loadingCtrl.create({ message: 'Logging in ...' });
    await loading.present();
    
    this.UserSrv.login(this.loginForm.value).subscribe(
        async token => {
          this.storage.set('token', token);
          loading.dismiss();
          this.isloggin$.next(true);
          this.navCtrl.navigateRoot('/dashboard');
        },

        async () => {
          const alert = await this.alertCtrl.create({ message: 'Login Failed', buttons: ['OK'] });
          await alert.present();
          loading.dismiss();
        }
    );
  }
  
  loginGoogle(){
    /* login con google */
  }

  loginFacebook(){
    /* login con facebook*/
  }
}
