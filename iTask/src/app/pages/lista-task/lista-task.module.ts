import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaTaskPageRoutingModule } from './lista-task-routing.module';

import { ListaTaskPage } from './lista-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaTaskPageRoutingModule
  ],
  declarations: [ListaTaskPage]
})
export class ListaTaskPageModule {}
