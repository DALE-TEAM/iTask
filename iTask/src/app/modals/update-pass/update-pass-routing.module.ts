import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatePassPage } from './update-pass.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePassPageRoutingModule {}
