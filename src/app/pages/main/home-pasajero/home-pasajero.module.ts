import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePasajeroPageRoutingModule } from './home-pasajero-routing.module';

import { HomePasajeroPage } from './home-pasajero.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePasajeroPageRoutingModule,
    SharedModule
  ],
  declarations: [HomePasajeroPage]
})
export class HomePasajeroPageModule {}
