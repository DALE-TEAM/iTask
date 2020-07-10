import { Component, OnInit,ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import * as jwt_decode from 'jwt-decode';
import{RemindersService } from "../../services/reminders.service";
import {Reminder} from "../../model/reminder.model";
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {IonItemSliding} from '@ionic/angular';
import {Router} from "@angular/router";
import {TaskService} from "../../services/task.service";
import {PlatformLocation} from "@angular/common";
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
    @ViewChild(IonItemSliding) itemSliding: IonItemSliding;
    Uid: any;
    name: any;
    // @ts-ignore
    reminder: Reminder[100] ;
    numberAllTask:any;
    numberTodayTask:any;
    numberFavoriteTask:any;
    token: any;

    constructor(private menu: MenuController,
                private remindersService: RemindersService,
                private taskservice: TaskService,
                private alertCtrl: AlertController,
                private toastCtrl: ToastController,
                private loadingCtrl: LoadingController,
                private router: Router,
                private location : PlatformLocation
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


        /*
             this.token = localStorage.getItem('token');
            let decoded = jwt_decode(this.token);
            console.log(decoded);

            this.name = decoded['name'];
            this.Uid = decoded.user_id;

         */

        this.Uid= 3;
        console.log(this.Uid);



    }

    NavTask(id){
        this.router.navigateByUrl('/lista-task/'+id);

    }
    NavDefault(key){
        this.router.navigateByUrl('/default-task/'+key);

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
}
