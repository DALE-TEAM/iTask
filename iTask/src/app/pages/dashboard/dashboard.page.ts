import { Component, OnInit,ViewChild } from '@angular/core';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import * as jwt_decode from 'jwt-decode';
import{RemindersService } from "../../services/reminders.service";
import {Reminder} from "../../model/reminder.model";
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {IonItemSliding} from '@ionic/angular';
import {Router} from "@angular/router";
import {Storage} from '@ionic/storage';


import {TaskService} from "../../services/task.service";
import {PlatformLocation} from "@angular/common";
import { UserService } from 'src/app/services/user.service';

import {  UpdateEmailPage } from '../../modals/update-email/update-email.page';
import {  UpdatePassPage } from '../../modals/update-pass/update-pass.page';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
    @ViewChild(IonItemSliding) itemSliding: IonItemSliding;
    Uid: any;
    email: any;
    name: any;
    surname: any;
    img: any
    // @ts-ignore
    reminder: Reminder[100] ;
    numberAllTask:any;
    numberTodayTask:any;
    numberFavoriteTask:any;
    token: any;

    constructor(private menu: MenuController,
                private remindersService: RemindersService,
                private taskservice: TaskService,
                private navCtrl: NavController,
                private modalCtrl: ModalController,
                private alertCtrl: AlertController,
                private toastCtrl: ToastController,
                private loadingCtrl: LoadingController,
                private router: Router,
                private location : PlatformLocation,
                private UserSrv: UserService,
                private storage: Storage
    ) { }
    openFirst() {
        this.menu.enable(true, 'first');
        this.menu.open('first');
    }

    openEnd() {
        this.menu.open('end');
    }

    openCustom() {
        this.menu.enable(true, 'custom');
        this.menu.open('custom');
    }

    ngOnInit() {
        this.token = localStorage.getItem('token');
        if(this.token){
          let decoded = jwt_decode(this.token);
          this.storage.set('user', decoded);
          this.email = decoded['email'];
          this.name = decoded['name'];
          this.surname = decoded['surname'];
          this.img = decoded['img'];
          this.Uid =decoded['user_id'];
      }

        /*
             this.token = localStorage.getItem('token');
            let decoded = jwt_decode(this.token);
            console.log(decoded);

            this.name = decoded['name'];
            this.Uid = decoded.user_id;
            this.Uid= 3;
            console.log(this.Uid);
        */

    }

    NavTask(id){
        this.router.navigateByUrl('/lista-task/'+id);

    }
    NavDefault(key){
        this.router.navigateByUrl('/default-task/'+key);

    }

    Navcalendar(){
        this.navCtrl.navigateRoot('calendar');
    }



    async delete_reminder(id: any){
        const loading = await this.loadingCtrl.create({ message: 'Elimino Elenco...' });
        await loading.present();
        this.remindersService.deleteReminders(id).subscribe( async response => {
                const toast = await this.toastCtrl.create({message: 'Elenco eliminato', duration: 3000, color: 'tertiary'});
                loading.dismiss();
                await toast.present();


                this.remindersService.getReminders(this.Uid).subscribe(response => {
                    this.reminder = response; });




            },
            //If there is an error
            async () => {
                const alert = await this.alertCtrl.create({ message: 'There is an error', buttons: ['OK'] });
                loading.dismiss();
                await alert.present();
            }
        );







    }

    ionViewDidEnter(){
        this.remindersService.getReminders(this.Uid).subscribe(response => {
            this.reminder = response;
        });
        this.taskservice.getNumTaskAll(this.Uid).subscribe(response => {
            this.numberAllTask = response;
        });
        this.taskservice.getNumTaskToday(this.Uid).subscribe(response => {
            this.numberTodayTask = response;
        });
        this.taskservice.getNumTaskFavorite(this.Uid).subscribe(response => {
            this.numberFavoriteTask = response;
        });
    }

    //logout
 logout(){
    this.UserSrv.logout();
 }

//modifica email
  async UpdateEmail(){
    const modal = await this.modalCtrl.create({
      component: UpdateEmailPage
    });
    return await modal.present();
  }

//modifica password
  async UpdatePass(){
    const modal = await this.modalCtrl.create({
      component: UpdatePassPage
    });
    return await modal.present();
  }
//cancella account
  async deleteAccount(){
    const alert = await this.alertCtrl.create({
      header: 'ELIMINA ACCOUNT',
      message: 'Sicuro di voler eliminare il tuo account?',
      cssClass: 'alertCancel',
      mode: 'ios',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'alertButton',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'YES',
          cssClass: 'alertButton',
          handler: () => {
            this.UserSrv.deleteAcc(this.Uid).subscribe(
              // If success
              async () => {
                
                const toast = await this.toastCtrl.create({ message: 'Account Cancellato', duration: 2000, color: 'dark' });
                await toast.present();
                this.navCtrl.navigateRoot(['/login']);
              },
               // If there is an error
               async () => {
                 const alert = await this.alertCtrl.create({ message: 'There is an error', buttons: ['OK'] });
                 await alert.present();
              }
            );
          }
        }
      ]
    })
    await alert.present();
    
  }


}
