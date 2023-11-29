import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerViajesProgramadosPage } from './ver-viajes-programados.page';

const routes: Routes = [
  {
    path: '',
    component: VerViajesProgramadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerViajesProgramadosPageRoutingModule {}
