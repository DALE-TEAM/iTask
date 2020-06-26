import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, NavController, LoadingController} from '@ionic/angular';
import {HttpErrorResponse} from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private alertController: AlertController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,        
              private navController: NavController,
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
    // const loading = await this.loadingCtrl.create({ message: 'Logging in ...' });
    // await loading.present();
    this.UserSrv.login(this.loginForm.value).subscribe( token => {
      localStorage.setItem('token', token);
      this.loginForm.reset();
      this.navController.navigateRoot('dashboard');
    });
  }

  loginGoogle(){
    /* login con google */
  }

  loginFacebook(){
    /* login con facebook*/
  }
}
