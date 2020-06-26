import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { NavController, ToastController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  
  private RegForm: FormGroup;
  
  
  constructor(
    private formBuilder: FormBuilder,
    private userServ: UserService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.RegForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
      ])],
      nome: ['', Validators.compose([
        Validators.required,
        
      ])],
      cognome: ['', Validators.compose([
        Validators.required
      ])]
    });
  }
   
  async registration(){
    const loading = await this.loadingCtrl.create({ message: 'Registrazione...' });
    await loading.present();
    this.userServ.register(this.RegForm.value).subscribe(
        // If success
        async () => {
          const toast = await this.toastCtrl.create({ message: 'Utente creato', duration: 2000, color: 'dark' });
          await toast.present();
          loading.dismiss();
          this.RegForm.reset();
          this.navCtrl.navigateRoot(['/login']);
        // },
        // // If there is an error
        // async () => {
        //   const alert = await this.alertCtrl.create({ message: 'There is an error', buttons: ['OK'] });
        //   loading.dismiss();
        //   await alert.present();
         }
    );
  }

}
