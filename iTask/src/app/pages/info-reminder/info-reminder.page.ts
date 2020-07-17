import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController, ModalController, NavController, ToastController} from '@ionic/angular';
import {SharePage} from '../../modals/share/share.page';
import {ActivatedRoute} from '@angular/router';
import {RemindersService} from '../../services/reminders.service';
import {Reminder} from '../../model/reminder.model';


@Component({
  selector: 'app-info-reminder',
  templateUrl: './info-reminder.page.html',
  styleUrls: ['./info-reminder.page.scss'],
})
export class InfoReminderPage implements OnInit {
  icon: any;
  color: any;
  private form: FormGroup;
  Uid: any;

  // @ts-ignore
  reminder: Reminder[100];
  name: any;
  nameValue: any;
  last_id: any;

  constructor(
      public alertController: AlertController,
      private modalCtrl: ModalController,
      private route: ActivatedRoute,
      private remindersService: RemindersService,
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingController,
      public navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.color = '';
    this.icon = '';
  }

  ionViewDidEnter() {
    const id = this.route.snapshot.paramMap.get('id');

    this.remindersService.getRemindersById(id).subscribe(res => {
      this.reminder = res;
      this.color = this.reminder[0].color;
      this.icon = this.reminder[0].icon;
      this.name = this.reminder[0].name;

      this.nameValue = this.name;

    });




  }



  setColor(color: any){
    this.color = color;

    console.log(color);
  }
  setIcon(icon: any){
    this.icon = icon;

    console.log(icon);
  }

  // tslint:disable-next-line:variable-name
  form_updateReminder = new FormGroup({
    reminder_id: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
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
  });

  async createReminder(){
    const id = this.route.snapshot.paramMap.get('id');
    this.form_updateReminder.value.icon = this.icon;
    this.form_updateReminder.value.color = this.color;
    this.form_updateReminder.value.reminder_id = id;

    console.log(this.form_updateReminder.value);

    const loading = await this.loadingCtrl.create({ message: 'aggiornamento elenco in corso...' });
    await loading.present();
    this.remindersService.updateReminder(this.form_updateReminder.value).subscribe(
        // If success
        async response => {
          this.last_id = response;

          loading.dismiss();

          this.navCtrl.navigateRoot('/lista-task/' + this.last_id) ;
        },
        // // If there is an error
        async () => {
          const alert = await this.alertController.create({ message: 'There is an error', buttons: ['OK'] });
          loading.dismiss();
          await alert.present();
  }
    );
  }


  async shareReminder(){
    const id = this.route.snapshot.paramMap.get('id');
    const modal = await this.modalCtrl.create({
      component: SharePage,
      componentProps: {
      id: id

      }
    });
    return await modal.present();
}

  async delete_reminder(){
    const id = this.route.snapshot.paramMap.get('id');

    const loading = await this.loadingCtrl.create({ message: 'Elimino Elenco...' });
    await loading.present();
    this.remindersService.deleteReminders(id).subscribe( async response => {
          const toast = await this.toastCtrl.create({message: 'Elenco eliminato', duration: 2000, color: 'tertiary'});
          loading.dismiss();
          await toast.present();


          this.remindersService.getReminders(this.Uid).subscribe(response => {
            this.reminder = response; });


          this.navCtrl.navigateRoot('/dashboard') ;

        },
        //If there is an error
        async () => {
          const alert = await this.alertController.create({ message: 'There is an error', buttons: ['OK'] });
          loading.dismiss();
          await alert.present();
        }
    );

    
  }

  async delete(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminazione Elenco',
      message: 'Sei sicuro di voler eliminare questo elenco?',
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Operazione annullata');
          }
        }, {
          text: 'Elimina',
          handler: () => {
            this.delete_reminder();

          }
        }
      ]
    });

    await alert.present();

  }

}


