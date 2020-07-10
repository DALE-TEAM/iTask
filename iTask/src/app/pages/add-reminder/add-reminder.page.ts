import {Component, OnInit, ViewChild} from '@angular/core';


@Component({
  selector: 'app-add-reminder',
  templateUrl: './add-reminder.page.html',
  styleUrls: ['./add-reminder.page.scss'],
})
export class AddReminderPage implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  setColor(color : any){
    console.log(color);
  }
  setIcon(name : any){
    console.log(name);
  }

}
