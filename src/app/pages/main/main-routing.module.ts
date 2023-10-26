import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { MainPage } from './main.page';
import { PasajeroGuard } from 'src/app/guards/pasajero.guard';
import { ConductorGuard } from 'src/app/guards/conductor.guard';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [

      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule), canActivate: [ConductorGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'home-pasajero',
        loadChildren: () => import('./home-pasajero/home-pasajero.module').then( m => m.HomePasajeroPageModule), canActivate: [PasajeroGuard]
      },
    ]

  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule { }
