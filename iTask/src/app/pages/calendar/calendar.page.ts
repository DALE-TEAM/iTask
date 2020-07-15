import { Component, OnInit } from '@angular/core';
import { Task} from "../../model/task.model";
import {TaskService} from "../../services/task.service";
import {AlertController, LoadingController, ToastController} from "@ionic/angular";
import * as moment from 'moment';
import * as jwt_decode from "jwt-decode";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  Uid:any;
  date:any;
  // @ts-ignore
  task:Task[100];
  token:any;
  isChecked: boolean;

  constructor( private taskservice: TaskService,
               private alertCtrl: AlertController,
               private toastCtrl: ToastController,
               private loadingCtrl: LoadingController,

  ) { }


  now = new Date();

  calendar = {
    mode: 'month',
    currentDate: new Date(),
    locale: 'en-GB',
  }

  /*
    onCurrentDateChanged = (ev: Date) => {
      console.log(moment(ev).format('DD-MM-YYYY'));
      let data=(moment(ev).format('DD-MM-YYYY'));
      console.log(data);

    };
  */


  async onCurrentDateChanged (ev: Date) {
    this.token = localStorage.getItem('token');
    if(this.token) {
      let decoded = jwt_decode(this.token);
      this.Uid = decoded['user_id'];
    }

    this.date=(moment(ev).format('YYYY-MM-DD'));
    //this.date = '2020-01-01';
    //this.Uid=3;

    this.taskservice.getTaskByDate(this.Uid,this.date).subscribe(   async response => {
          this.task = response;

          console.log('Data cliccata: ' + this.date);
          console.log(this.task);

        },
        //If there is an error
        async () => {
          const alert = await this.alertCtrl.create({ message: 'There is an error', buttons: ['OK'] });

          await alert.present();
        }
    );


  };



  async toast(taskId: any){

    this.taskservice.setDone(taskId).subscribe(response => {});
    const toast = await this  .toastCtrl.create({ message: 'Task completato', duration: 3500, color: 'tertiary', buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          handler: () => {


            this.isChecked == false;
            console.log('Annullato');
            this.taskservice.setPending(taskId).subscribe(response => {});
            this.taskservice.getTaskByDate(this.Uid,this.date).subscribe(response => {
              this.task = response;
            });
          }
        }
      ]
    });
    await toast.present();
    this.taskservice.getTaskByDate(this.Uid,this.date).subscribe(response => {
      this.task = response;
    });


  }




  ngOnInit() {
    this.token = localStorage.getItem('token');
    if(this.token){
      let decoded = jwt_decode(this.token);

      this.Uid =decoded['user_id'];
    }
  }

  async alterFavorite(idTask: any){
    const loading = await this.loadingCtrl.create({ message: '' });
    await loading.present();


    this.taskservice.alterFavoriteStatus(idTask).subscribe( async response => {
          this.taskservice.getTaskByDate(this.Uid,this.date).subscribe(response => {
            this.task = response;
          });
          loading.dismiss();


        },
        // If there is an error
        async () => {
          const alert = await this.alertCtrl.create({ message: 'There is an error', buttons: ['OK'] });
          loading.dismiss();
          await alert.present();
        }
    );

    console.log('ok');
  }



}
