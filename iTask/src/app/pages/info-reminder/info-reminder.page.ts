import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertController } from "@ionic/angular";

@Component({
  selector: 'app-info-reminder',
  templateUrl: './info-reminder.page.html',
  styleUrls: ['./info-reminder.page.scss'],
})
export class InfoReminderPage implements OnInit {
  icon: any;
  color:any;

  constructor(public alertController: AlertController) { }

  ngOnInit() {
    this.color='lightblue';
    this.icon='list';
  }

  setColor(color : any){
    this.color=color;

    console.log(color);
  }
  setIcon(icon : any){
    this.icon=icon;

    console.log(icon);
  }

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
  });

  createReminder(){

    this.form_addReminder.value['icon']=this.icon;
    this.form_addReminder.value['color']=this.color;
    console.log(this.form_addReminder.value['name']);
    console.log(this.form_addReminder.value['color']);
    console.log(this.form_addReminder.value['icon']);

  }
  async alert(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Condividi elenco',
      message: 'Sei sicuro di voler condividere il tuo elenco?',
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Condivisione annullata');
          }
        }, {
          text: 'Condividi',
          handler: () => {
            console.log('Elenco condiviso ');
          }
        }
      ]
    });

    await alert.present();

  }

}


