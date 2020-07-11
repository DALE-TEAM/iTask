import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController, ToastController, NavController } from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../../services/user.service';
import * as jwt_decode from 'jwt-decode';



@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.page.html',
  styleUrls: ['./update-email.page.scss'],
})
export class UpdateEmailPage implements OnInit {
  
  updateForm: FormGroup;
  token: any;
  Uid: any;
  

  constructor( 
    private modalCtrl: ModalController, 
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private userServ: UserService ) { }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      oldEmail: ['', Validators.compose([
        Validators.required
      ])],
      newEmail: ['', Validators.compose([
        Validators.required
      ])]
    });

    this.token = localStorage.getItem('token');
    let decoded = jwt_decode(this.token);
    this.Uid = decoded['user_id'];
  }

  async closeModal(){
    await this.modalCtrl.dismiss();
  }

  async update(){
    const loading = await this.loadingCtrl.create({ message: 'Modifica in corso...' });
    await loading.present();
    this.userServ.updateEmail(this.updateForm.value, this.Uid).subscribe(
        // If success
        async () => {
          const toast = await this.toastCtrl.create({ message: 'Email Modificata correttamente', duration: 2000, color: 'dark' });
          await toast.present();
          loading.dismiss();
          this.updateForm.reset();
          await this.modalCtrl.dismiss();
          this.userServ.logout();
        },
        // If there is an error
         async () => {
           const alert = await this.alertCtrl.create({ message: 'Errore', buttons: ['OK'] });
           loading.dismiss();
           await alert.present();
        }
    );
  }

}
