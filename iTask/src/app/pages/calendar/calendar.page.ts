import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  constructor() { }

  now = new Date();

  calendar = {
    mode: 'month',
    currentDate: new Date(),
    locale: 'en-GB'
  }


  onCurrentDateChanged = (ev: Date) => {
    console.log('Currently viewed date: ' + ev);
  };

  ngOnInit() {
  }

}
