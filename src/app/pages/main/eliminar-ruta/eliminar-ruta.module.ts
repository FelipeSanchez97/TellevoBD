import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { EliminarRutaPageRoutingModule } from './eliminar-ruta-routing.module';

import { EliminarRutaPage } from './eliminar-ruta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarRutaPageRoutingModule,
    SharedModule
  ],
  declarations: [EliminarRutaPage]
})
export class EliminarRutaPageModule {}
