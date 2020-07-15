import {Component, OnInit, ViewChild} from '@angular/core';

import {IonDatetime} from '@ionic/angular';
import {Task} from '../../model/task.model';
import {TaskService} from '../../services/task.service';
import {RemindersService} from '../../services/reminders.service';
import {Reminder} from '../../model/reminder.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, LoadingController, ToastController, IonReorderGroup} from '@ionic/angular';
import {IonCheckbox} from '@ionic/angular';

@Component({
  selector: 'app-lista-task',
  templateUrl: './lista-task.page.html',
  styleUrls: ['./lista-task.page.scss'],
})
export class ListaTaskPage implements OnInit {
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;
  @ViewChild(IonCheckbox) checkbox: IonCheckbox;
  // @ts-ignore
  task: Task[100] ;
  // @ts-ignore
  reminder: Reminder[100];
  isChecked: boolean;

  constructor(
      private taskService: TaskService,
      private remindersService: RemindersService,
      private route: ActivatedRoute,
      private router: Router,
      private loadingCtrl: LoadingController,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController,
  ) { }
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
this.isChecked = false;

  }
  ionViewDidEnter(){
    const id = this.route.snapshot.paramMap.get('id');
    this.taskService.getTask(id).subscribe(response => {
      this.task = response;
      this.remindersService.getRemindersById(id).subscribe(res => {
        this.reminder = res;
      });
    });
  }

  dettagli_task(){
    console.log('ciao');
  }
  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }

  async alterFavorite(idTask: any){
    const loading = await this.loadingCtrl.create({ message: '' });
    await loading.present();
    const id = this.route.snapshot.paramMap.get('id');

    this.taskService.alterFavoriteStatus(idTask).subscribe( async response => {
          this.taskService.getTask(id).subscribe(response => {
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

    console.log('ciao');
  }

  async toast(taskId: any){
    const id = this.route.snapshot.paramMap.get('id');
    this.taskService.setDone(taskId).subscribe(response => {});
    const toast = await this  .toastCtrl.create({ message: 'Task completato', duration: 3500, color: 'tertiary', buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          handler: () => {


            this.isChecked == false;
            console.log('Annullato');
            this.taskService.setPending(taskId).subscribe(response => {});
            this.taskService.getTask(id).subscribe(response => {
              this.task = response;
              this.remindersService.getRemindersById(id).subscribe(res => {
                this.reminder = res;
              });
            });




          }

        }
      ]
    });
    await toast.present();
    this.taskService.getTask(id).subscribe(response => {
      this.task = response;
      this.remindersService.getRemindersById(id).subscribe(res => {
        this.reminder = res;
      });
    });

  }

  navDashboard(){
    this.router.navigateByUrl('/dashboard');
  }
NavCreateTask(idRem:any){
  this.router.navigateByUrl('/add-task/'+idRem);

}

}
