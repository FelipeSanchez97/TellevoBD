import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EliminarRutaPage } from './eliminar-ruta.page';

const routes: Routes = [
  {
    path: '',
    component: EliminarRutaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EliminarRutaPageRoutingModule {}
