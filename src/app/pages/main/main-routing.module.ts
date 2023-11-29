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
      {
        path: 'agregar-ruta',
        loadChildren: () => import('./agregar-ruta/agregar-ruta.module').then( m => m.AgregarRutaPageModule), canActivate: [ConductorGuard]
      },
      {
        path: 'eliminar-ruta',
        loadChildren: () => import('./eliminar-ruta/eliminar-ruta.module').then( m => m.EliminarRutaPageModule), canActivate: [ConductorGuard]
      },
      {
        path: 'solicitudes',
        loadChildren: () => import('./solicitudes/solicitudes.module').then( m => m.SolicitudesPageModule), canActivate: [ConductorGuard]
      },
      {
        path: 'ver-rutas',
        loadChildren: () => import('./ver-rutas/ver-rutas.module').then( m => m.VerRutasPageModule), canActivate: [PasajeroGuard]
      },
      {
        path: 'viaje-programado',
        loadChildren: () => import('./viaje-programado/viaje-programado.module').then( m => m.ViajeProgramadoPageModule), canActivate: [PasajeroGuard]
      },
    ]

  },
  {
    path: 'ver-viajes-programados',
    loadChildren: () => import('./ver-viajes-programados/ver-viajes-programados.module').then( m => m.VerViajesProgramadosPageModule)
  },
  
  
  
  
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule { }
