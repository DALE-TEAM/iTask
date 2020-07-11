import {Component, OnInit, ViewChild} from '@angular/core';

import {IonDatetime} from "@ionic/angular";
import {Task} from "../../model/task.model";
import {TaskService} from "../../services/task.service";
import {RemindersService} from "../../services/reminders.service";
import{Reminder} from "../../model/reminder.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertController, LoadingController, ToastController,IonReorderGroup} from '@ionic/angular';
import {IonCheckbox} from "@ionic/angular";
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-default-task',
  templateUrl: './default-task.page.html',
  styleUrls: ['./default-task.page.scss'],
})
export class DefaultTaskPage implements OnInit {
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;
  @ViewChild(IonCheckbox) checkbox: IonCheckbox;
  // @ts-ignore
  task: Task[100] ;
  // @ts-ignore
  reminder: Reminder[100];
  isChecked: boolean;
  Uid: any;
  defIcon: any;
  defName: any;
  token: any ;

  constructor( private taskService: TaskService,
               private remindersService: RemindersService,
               private route: ActivatedRoute,
               private router: Router,
               private loadingCtrl: LoadingController,
               private alertCtrl: AlertController,
               private toastCtrl: ToastController,) { }

  doReorder(ev: any) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }


  ngOnInit(){
    this.isChecked=false;
    let key = this.route.snapshot.paramMap.get('key');
    this.token = localStorage.getItem('token');
    if(this.token){
      let decoded = jwt_decode(this.token);

      this.Uid =decoded['user_id'];
    }

    if(key=='all'){
      this.taskService.getAllTask(this.Uid).subscribe(response => {
        this.task = response;
      });
      console.log('all function');
      this.defName='Tutti';
          this.defIcon='list';
    }

    if(key=='favorite'){
      this.taskService.getFavoriteTask(this.Uid).subscribe(response => {
        this.task = response;
      });
      console.log('favorite function');
      this.defIcon='star';
      this.defName='Preferiti';
    }
    if(key=='today'){
      this.taskService.getTodayTask(this.Uid).subscribe(response => {
        this.task = response;

      });
      console.log('today function');
      this.defIcon='calendar-outline';
      this.defName='Oggi';
    }

  }

  dettagli_task(){
    console.log('ciao');
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }

  async alterFavorite(idTask:any){
    const loading = await this.loadingCtrl.create({ message: '' });
    await loading.present();
    let key = this.route.snapshot.paramMap.get('key');

    this.taskService.alterFavoriteStatus(idTask).subscribe( async response => {
          if(key=='all'){
            this.taskService.getAllTask(this.Uid).subscribe(response => {
              this.task = response;
            });
            console.log('all function');
            this.defName='Tutti';
            this.defIcon='list';
          }

          if(key=='favorite'){
            this.taskService.getFavoriteTask(this.Uid).subscribe(response => {
              this.task = response;
            });
            console.log('favorite function');
            this.defIcon='star';
            this.defName='Preferiti';
          }
          if(key=='today'){
            this.taskService.getTodayTask(this.Uid).subscribe(response => {
              this.task = response;

            });
            console.log('today function');
            this.defIcon='calendar-outline';
            this.defName='Oggi';
          }
          loading.dismiss();


        },
        //If there is an error
        async () => {
          const alert = await this.alertCtrl.create({ message: 'There is an error', buttons: ['OK'] });
          loading.dismiss();
          await alert.present();
        });

  }

  async toast(taskId:any){
    let key = this.route.snapshot.paramMap.get('key');
    this.taskService.setDone(taskId).subscribe(response => {});
    const toast = await this  .toastCtrl.create({ message: 'Task completato', duration: 3500, color: 'tertiary', buttons:[
        {
          text: 'Annulla',
          role: 'cancel',
          handler: () => {

            this.isChecked == false;
            console.log('Annullato');
            this.taskService.setPending(taskId).subscribe(response => {});
            if(key=='all'){
              this.taskService.getAllTask(this.Uid).subscribe(response => {
                this.task = response;
              });
              console.log('all function');
              this.defName='Tutti';
              this.defIcon='list';
            }

            if(key=='favorite'){
              this.taskService.getFavoriteTask(this.Uid).subscribe(response => {
                this.task = response;
              });
              console.log('favorite function');
              this.defIcon='star';
              this.defName='Preferiti';
            }
            if(key=='today'){
              this.taskService.getTodayTask(this.Uid).subscribe(response => {
                this.task = response;

              });
              console.log('today function');
              this.defIcon='calendar-outline';
              this.defName='Oggi';
            }
          }
        }
        ]
    });
    await toast.present();


    if(key=='all'){
      this.taskService.getAllTask(this.Uid).subscribe(response => {
        this.task = response;
      });
      console.log('all function');
      this.defName='Tutti';
      this.defIcon='list';
    }

    if(key=='favorite'){
      this.taskService.getFavoriteTask(this.Uid).subscribe(response => {
        this.task = response;
      });
      console.log('favorite function');
      this.defIcon='star';
      this.defName='Preferiti';
    }
    if(key=='today'){
      this.taskService.getTodayTask(this.Uid).subscribe(response => {
        this.task = response;

      });
      console.log('today function');
      this.defIcon='calendar-outline';
      this.defName='Oggi';
    }

  }

  navDashboard(){
    this.router.navigateByUrl('/dashboard');
  }

}
