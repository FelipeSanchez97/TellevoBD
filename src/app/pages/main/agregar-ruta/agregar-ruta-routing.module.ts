import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AgregarRutaPage } from './agregar-ruta.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarRutaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarRutaPageRoutingModule {}
