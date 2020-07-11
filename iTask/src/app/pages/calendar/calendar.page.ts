import { Component, OnInit } from '@angular/core';
import { Task} from "../../model/task.model";
import {TaskService} from "../../services/task.service";
import {AlertController, LoadingController, ToastController} from "@ionic/angular";


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

  constructor( private taskservice: TaskService,
               private alertCtrl: AlertController,
               private toastCtrl: ToastController,
               private loadingCtrl: LoadingController,

  ) { }

  now = new Date();

  calendar = {
    mode: 'month',
    currentDate: new Date(),
    locale: 'en-GB'
  }


  async onCurrentDateChanged (ev: Date) {

    const loading = await this.loadingCtrl.create({ message: '' });
    await loading.present();

    this.Uid=3;
    this.date = '2020-01-01';

    this.date=Date;
    this.taskservice.getTaskByDate(this.Uid,this.date).subscribe( async response => {
          this.task = response;
          loading.dismiss();

        },
        //If there is an error
        async () => {
          const alert = await this.alertCtrl.create({ message: 'There is an error', buttons: ['OK'] });
          loading.dismiss();
          await alert.present();
        }
    );

    console.log('Currently viewed date: ' + ev);
  };

  ngOnInit() {}

}
