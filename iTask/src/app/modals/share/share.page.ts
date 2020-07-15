import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertController, LoadingController, ModalController, NavController, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {RemindersService} from "../../services/reminders.service";

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit {
id;
word:any;
last_id:any;
sharedUser:any;
  constructor( private modalCtrl: ModalController,
               private router: Router,
               private alertCtrl: AlertController,
               private toastCtrl: ToastController,
               private loadingCtrl: LoadingController,
               public navCtrl: NavController,
               private reminderService: RemindersService,
  ) { }

  shareForm = new FormGroup({
  email: new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]),
    id: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });

  async closeModal(){
    await this.modalCtrl.dismiss();


  }

   async emailShared(){
    this.word = `${this.id}`;
    this.shareForm.value.id=this.word;
    console.log('Email: ' + this.shareForm.value.email);
    console.log('Id: ' + this.shareForm.value.id);
    console.log( this.shareForm.value);



    const loading = await this.loadingCtrl.create({ message: 'Creazione elenco in corso...' });
    await loading.present();
    this.reminderService.shareReminder(this.shareForm.value).subscribe(
        // If success
        async response => {
          this.last_id = response;

          loading.dismiss();
          this.shareForm.reset();
          this.navCtrl.navigateRoot('/lista-task/' + this.last_id) ;
        },
        // // If there is an error
        async () => {
          const alert = await this.alertCtrl.create({ message: 'Utente non trovato', buttons: ['OK'] });
          loading.dismiss();
          await alert.present();
        }
    );


  }






  ngOnInit() {
    this.word = `${this.id}`;
    this.reminderService.getSharedUser(this.word).subscribe(
        // If success
        async response => {
          this.sharedUser = response;

        },
        // // If there is an error
        async () => {
          const alert = await this.alertCtrl.create({ message: 'There is an error', buttons: ['OK'] });

          await alert.present();
        }
    );

  }

}
