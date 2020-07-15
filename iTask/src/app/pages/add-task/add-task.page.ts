import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonDatetime, LoadingController, NavController, ToastController} from '@ionic/angular';
import {IonInput } from '@ionic/angular';
import * as jwt_decode from 'jwt-decode';
import {RemindersService } from '../../services/reminders.service';
import {Reminder} from '../../model/reminder.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../../services/task.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {
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
  id:any;
  classe:any;
  remValue: any;



  constructor(
      private remindersService: RemindersService,
      private taskservice: TaskService,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingController,
      public navCtrl: NavController,
      private route: ActivatedRoute,
  ) { }

  form_addDate = new FormGroup({
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
    priority: new FormControl('nessuna', [

      Validators.minLength(3),
    ]),
    reminder: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    dateP: new FormControl('', [


    ]),
    timeP: new FormControl('', [

    ]),
  });

  ngOnInit() {
    this.classe='';
    this.id = this.route.snapshot.paramMap.get('id');
    this.token = localStorage.getItem('token');
    if(this.token){
      let decoded = jwt_decode(this.token);
      this.Uid = decoded['user_id'];
    }
    this.favoriteStatus = 'star-outline'; // default status


    this.remindersService.getReminders(this.Uid).subscribe(response => {
      this.reminder = response;
    });


    // tslint:disable-next-line:triple-equals
    if (this.id != 0){
      this.remValue = this.id;
      console.log(this.id);
    }
  }
  ionDidViewEnter(){
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id != 0){
      this.remValue = this.id;
      console.log(this.id);
    }

  }
  changeFavoriteStatus(){
    if (this.favoriteStatus == 'star-outline'){
      this.favoriteStatus = 'star';
    }
    else{
      this.favoriteStatus = 'star-outline';
    }
  }


  async onAdd(){
    if (!this.date){
      this.form_addDate.value.dateP = '2000/01/01';
    }
    if (!this.hour){
      this.form_addDate.value.timeP = '';
    }

    if (this.form_addDate.value.note == ''){
      this.form_addDate.value.note = 'NULL';
    }

    this.form_addDate.value.favorite = this.favoriteStatus;
    const NewDate = this.form_addDate.value.dateP.split('T');
    this.form_addDate.value.dateP = NewDate[0];
    // aggiungere conversione per form 'timeP'

    const loading = await this.loadingCtrl.create({ message: 'Creazione task in corso...' });
    await loading.present();
    this.taskservice.addTask(this.form_addDate.value).subscribe(
        // If success
        async response => {
          this.last_id = response;

          loading.dismiss();
          this.form_addDate.reset();
          this.navCtrl.navigateRoot('/lista-task/' + this.last_id) ;
        },
        // // If there is an error
        async () => {
          const alert = await this.alertCtrl.create({ message: 'There is an error', buttons: ['OK'] });
          loading.dismiss();
          await alert.present();
        }
    );


    console.log('!favorite:' + this.form_addDate.value.favorite);
    console.log('!nome:' + this.form_addDate.value.name);
    console.log('note:' + this.form_addDate.value.note);
    console.log('url:' + this.form_addDate.value.url);
    console.log('priority' + this.form_addDate.value.priority);
    console.log('!reminder:' + this.form_addDate.value.reminder);

    console.log('New date:' + NewDate[0]);
    console.log('date:' + this.form_addDate.value.dateP);
    console.log('Time:' + this.form_addDate.value.timeP);
    console.log('hour: ' + this.hour + '   date: ' + this.date);
  }



}
