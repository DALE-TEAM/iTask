import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController, NavController, ToastController} from '@ionic/angular';
import {RemindersService} from '../../services/reminders.service';
import * as jwt_decode from "jwt-decode";



@Component({
  selector: 'app-add-reminder',
  templateUrl: './add-reminder.page.html',
  styleUrls: ['./add-reminder.page.scss'],
})
export class AddReminderPage implements OnInit {
  constructor(
      private alertCtrl: AlertController,
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingController,
      public navCtrl: NavController,
      private reminderService: RemindersService,
  ) { }
  icon: any;
  color: any;
  Uid: any;
  last_id: any ;
  token:any;

  form_addReminder = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    color: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    icon: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    user: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });

  ngOnInit() {
    this.color = 'lightblue';
    this.icon = 'list';
    this.token = localStorage.getItem('token');
    if (this.token){
          let decoded = jwt_decode(this.token);
          this.Uid = decoded['user_id'];
      }


  }

  setColor(color: any){
    this.color = color;

    console.log(color);
  }
  setIcon(icon: any){
    this.icon = icon;

    console.log(icon);
  }

 async createReminder(){

    this.form_addReminder.value.icon = this.icon;
    this.form_addReminder.value.color = this.color;
    console.log(this.form_addReminder.value.name);
    console.log(this.form_addReminder.value.color);
    console.log(this.form_addReminder.value.icon);

    this.form_addReminder.value.user = this.Uid;

    const loading = await this.loadingCtrl.create({ message: 'Creazione elenco in corso...' });
    await loading.present();
    this.reminderService.createReminder(this.form_addReminder.value).subscribe(
        // If success
        async response => {
          this.last_id = response;

          loading.dismiss();
          this.form_addReminder.reset();
          this.navCtrl.navigateRoot('/lista-task/' + this.last_id) ;
           },
          // // If there is an error
           async () => {
            const alert = await this.alertCtrl.create({ message: 'There is an error', buttons: ['OK'] });
            loading.dismiss();
            await alert.present();
        }
    );


  }

}
