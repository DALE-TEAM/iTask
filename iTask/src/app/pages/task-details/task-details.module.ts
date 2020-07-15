import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskDetailsPageRoutingModule } from './task-details-routing.module';

import { TaskDetailsPage } from './task-details.page';
import { from } from 'rxjs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TaskDetailsPageRoutingModule
  ],
  declarations: [TaskDetailsPage]
})
export class TaskDetailsPageModule {}
