import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { IonDatetime, IonInput, AlertController, ToastController, LoadingController, NavController } from '@ionic/angular';
import { RemindersService } from 'src/app/services/reminders.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.page.html',
  styleUrls: ['./task-details.page.scss'],
})
export class TaskDetailsPage implements OnInit {

  res: any;
  task_id: any;
  task_name: any;
  task_note: any;
  task_url: any;
  task_pri: any;
  task_elenco: any;
  task_giorno: any;
  task_ora: any;
  idreind:any;
  

  @ViewChild(IonDatetime) datetime: IonDatetime;
  @ViewChild(IonInput) input: IonDatetime;
  public hour = false;
  public date = false;

  Uid: any;
  // @ts-ignore
  reminder: Reminder[100];
  favoriteStatus: any;
  last_id: any;
  token: any;
  idtask:any;


  constructor(
      private remindersService: RemindersService,
      private taskservice: TaskService,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingController,
      private route: ActivatedRoute,
      public navCtrl: NavController
  ) { }

  form_update = new FormGroup({
    id: new FormControl ('', [
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    note: new FormControl('', [
    ]),
    favorite: new FormControl('star-outline', [
      Validators.minLength(2),
    ]),
    url: new FormControl('', [
    ]),
    priority: new FormControl('', [
      Validators.minLength(3),
    ]),
    reminder: new FormControl('', [
      Validators.minLength(1),
    ]),
    dateP: new FormControl('', [
    ]),
    timeP: new FormControl('', [
    ]),
  });  

  ngOnInit() {
    
    this.token = localStorage.getItem('token');
    let decoded = jwt_decode(this.token);
    this.Uid = decoded['user_id'];
    
    this.favoriteStatus = ''; // default status
    this.remindersService.getReminders(this.Uid).subscribe(response => {
      this.reminder = response;
    });
  }

  ionViewDidEnter(){
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.taskservice.taskDetails(id).subscribe( response => {
      this.res=response;
      this.task_id=this.res[0].id;

      this.task_name=this.res[0].name;
      this.task_note=this.res[0].note;
      this.task_url=this.res[0].URL;
      this.task_pri=this.res[0].priority;
      this.task_elenco=this.res[0].remindersKey;
      this.task_giorno=this.res[0].dateP;
      this.task_ora=this.res[0].timeP;
      this.favoriteStatus=this.res[0].favorite;
if(this.task_note=='NULL'){
  this.task_note='';
}
      if(this.task_giorno!='2000-01-01'){
        this.date=true;
      }
      if(this.task_ora!='00:00:00'){
        this.hour=true;

      }

    });
  }      

  changeFavoriteStatus(){
    if (this.favoriteStatus == 'star-outline'){
      this.favoriteStatus = 'star';
    }
    else{
      this.favoriteStatus = 'star-outline';
    }
  }
  async deleteTask(){
    const id = this.route.snapshot.paramMap.get('id');
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: 'Elimina Task',
        message: 'Sei sicuro di voler eliminare il task?',
        buttons: [
          {
            text: 'Annulla',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('eliminazione annullata');






            }
          }, {
            text: 'Elimina',
            handler: () => {
              console.log('task deleted');
              console.log(id);
              this.taskservice.deleteTask(id).subscribe(response => {
                const redirection=response;
                this.navCtrl.navigateRoot('/lista-task/' +  redirection) ;

              });
            }
          }
        ]
      });

      await alert.present();


  }



  async update(){
    if (!this.date){
      this.form_update.value.dateP = '2000/01/01';
    }
    if (!this.hour){
      this.form_update.value.timeP = '';
    }

    if (this.form_update.value.note == ''){
      this.form_update.value.note = 'NULL';
    }
    
this.idreind= this.form_update.value.reminder;
    this.form_update.value.favorite = this.favoriteStatus;
    const NewDate = this.form_update.value.dateP.split('T');
    this.form_update.value.dateP = NewDate[0];

    this.form_update.value.id=this.route.snapshot.paramMap.get('id');
  

    // aggiungere conversione per form 'timeP'

    const loading = await this.loadingCtrl.create({ message: 'Modifica task in corso...' });
    await loading.present();
    console.log(this.form_update.value);
    this.taskservice.updateTask(this.form_update.value).subscribe(
        // If success
        async response => {

          loading.dismiss();
          this.form_update.reset();
          this.navCtrl.navigateRoot('/lista-task/' +  this.idreind) ;
        },
        //If there is an error
         async () => {
          const alert = await this.alertCtrl.create({ message: 'There is an error', buttons: ['OK'] });
           loading.dismiss();
           await alert.present();
         }
    );
  
  }
}