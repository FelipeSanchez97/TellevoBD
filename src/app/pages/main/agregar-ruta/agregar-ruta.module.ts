import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { AgregarRutaPageRoutingModule } from './agregar-ruta-routing.module';

import { AgregarRutaPage } from './agregar-ruta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarRutaPageRoutingModule,
    SharedModule
  ],
  declarations: [AgregarRutaPage]
})
export class AgregarRutaPageModule {}
