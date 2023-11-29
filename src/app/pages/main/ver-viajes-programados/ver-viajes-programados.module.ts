import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { VerViajesProgramadosPageRoutingModule } from './ver-viajes-programados-routing.module';

import { VerViajesProgramadosPage } from './ver-viajes-programados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerViajesProgramadosPageRoutingModule,
    SharedModule
  ],
  declarations: [VerViajesProgramadosPage]
})
export class VerViajesProgramadosPageModule {}
