import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { VerRutasPageRoutingModule } from './ver-rutas-routing.module';

import { VerRutasPage } from './ver-rutas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerRutasPageRoutingModule,
    SharedModule
  ],
  declarations: [VerRutasPage]
})
export class VerRutasPageModule {}
