import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-add-reminder',
  templateUrl: './add-reminder.page.html',
  styleUrls: ['./add-reminder.page.scss'],
})
export class AddReminderPage implements OnInit {
  icon: any;
  color:any;

  constructor() { }

  ngOnInit() {
    this.color='lightblue';
    this.icon='list';
  }

  setColor(color : any){
    this.color=color;

    console.log(color);
  }
  setIcon(icon : any){
    this.icon=icon;

    console.log(icon);
  }

  form_addReminder = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    color: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    icon: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });

  createReminder(){

    this.form_addReminder.value['icon']=this.icon;
    this.form_addReminder.value['color']=this.color;
    console.log(this.form_addReminder.value['name']);
    console.log(this.form_addReminder.value['color']);
    console.log(this.form_addReminder.value['icon']);

  }

}
