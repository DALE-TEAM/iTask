import {Component, OnInit, ViewChild} from '@angular/core';
import { IonDatetime} from "@ionic/angular";
import {IonInput } from "@ionic/angular";

import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {
  @ViewChild(IonDatetime) datetime: IonDatetime;
  @ViewChild(IonInput) input: IonDatetime;
  public hour:boolean = false;
  public date:boolean = false;



  constructor() { }

  ngOnInit() {
  }

  form_addDate = new FormGroup({
    name: new FormControl('Nuovo promemoria', [
      Validators.required,
      Validators.minLength(3),
    ]),
    url: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    priority: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    reminder: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    dateP: new FormControl('01/01/2020', [
      Validators.required,
      Validators.minLength(3),
    ]),
    timeP: new FormControl('09:00', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  onAdd(){
    console.log(this.form_addDate.value['name']);
    console.log(this.form_addDate.value['url']);
    console.log(this.form_addDate.value['priority']);
    console.log(this.form_addDate.value['reminder']);
    let NewDate = this.form_addDate.value['dateP'].split('T');
    console.log(NewDate[0]);
    console.log(this.form_addDate.value['timeP']);
  }



}
