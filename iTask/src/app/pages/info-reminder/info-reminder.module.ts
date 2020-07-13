import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoReminderPageRoutingModule } from './info-reminder-routing.module';

import { InfoReminderPage } from './info-reminder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoReminderPageRoutingModule
  ],
  declarations: [InfoReminderPage]
})
export class InfoReminderPageModule {}
