import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController, ToastController, NavController } from '@ionic/angular';
import { RemindersService } from 'src/app/services/reminders.service';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  word: any;
  search;
  resultsR: any;
  resultsT: any;

  constructor(
    private modalCtrl: ModalController,
    private remindersrv: RemindersService,
    private tasksrv: TaskService,
    private router: Router
  ) { }
  
  

  ngOnInit() {
    this.word = `${this.search}`;
    console.log(this.word);
    this.remindersrv.searchR(this.word).subscribe(response => {
      this.resultsR = response;
      console.log(response);
    });
    this.tasksrv.searchT(this.word).subscribe(response => {
      this.resultsT = response;
      console.log(response);
    });
  }
  
  async closeModal(){
    await this.modalCtrl.dismiss();
  }

  NavTask(id){
    this.modalCtrl.dismiss();
    this.router.navigateByUrl('/lista-task/'+id);
  }
}
