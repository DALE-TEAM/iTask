import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoReminderPage } from './info-reminder.page';

const routes: Routes = [
  {
    path: '',
    component: InfoReminderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoReminderPageRoutingModule {}
