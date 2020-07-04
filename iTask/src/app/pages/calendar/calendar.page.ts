import { Component, OnInit } from '@angular/core';
import {CalendarComponentOptions} from "ion2-calendar";
import { CalendarModule } from 'ion2-calendar';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  dateMulti: string[];
  type: 'string';

  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi',
    monthFormat: 'DD  MM  YYY ',
    weekdays: ['D', 'L', 'M', 'M', 'G', 'V', 'S'],
    weekStart: 1
  };
  constructor() { }


  ngOnInit() {
  }

}
