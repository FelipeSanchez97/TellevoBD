import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajeProgramadoPage } from './viaje-programado.page';

const routes: Routes = [
  {
    path: '',
    component: ViajeProgramadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajeProgramadoPageRoutingModule {}
