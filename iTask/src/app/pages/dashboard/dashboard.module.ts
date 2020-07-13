import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { UpdateEmailPage } from '../../modals/update-email/update-email.page'
import { UpdatePassPage } from '../../modals/update-pass/update-pass.page'
import { SearchPage }  from '../../modals/search/search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DashboardPageRoutingModule
  ],
  declarations: [DashboardPage, UpdateEmailPage, UpdatePassPage, SearchPage],
  entryComponents: [UpdateEmailPage, UpdatePassPage, SearchPage]
})
export class DashboardPageModule {}
