import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { UpdateEmailPage } from '../../modals/update-email/update-email.page'
import { UpdatePassPage } from '../../modals/update-pass/update-pass.page'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule
  ],
  declarations: [DashboardPage, UpdateEmailPage, UpdatePassPage],
  entryComponents: [UpdateEmailPage, UpdatePassPage]
})
export class DashboardPageModule {}
