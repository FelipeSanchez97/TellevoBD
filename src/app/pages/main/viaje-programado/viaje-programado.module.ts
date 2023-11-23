import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { ViajeProgramadoPageRoutingModule } from './viaje-programado-routing.module';

import { ViajeProgramadoPage } from './viaje-programado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajeProgramadoPageRoutingModule,
    SharedModule
  ],
  declarations: [ViajeProgramadoPage]
})
export class ViajeProgramadoPageModule {}
