import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefaultTaskPageRoutingModule } from './default-task-routing.module';

import { DefaultTaskPage } from './default-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefaultTaskPageRoutingModule
  ],
  declarations: [DefaultTaskPage]
})
export class DefaultTaskPageModule {}
