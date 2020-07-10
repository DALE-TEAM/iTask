import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePassPageRoutingModule } from './update-pass-routing.module';

import { UpdatePassPage } from './update-pass.page';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    UpdatePassPageRoutingModule
  ],
  declarations: [UpdatePassPage]
})
export class UpdatePassPageModule {}
