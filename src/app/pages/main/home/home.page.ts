import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import { AddUpdateRutaComponent } from './../../../shared/components/add-update-ruta/add-update-ruta.component';
import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  constructor(private router: Router) { }

  ngOnInit() {
  }

  //=====CERRAR SESION=====

  signOut() {
    this.firebaseSvc.signOut();
  }

  //====AGREGAR O ACTUALZIAR RUTA====

  addUpdateRuta() {

    this.utilsSvc.presentModal({
      component: AddUpdateRutaComponent,
      cssClass: 'add-update-modal'
    })
  }

  /* <!-- OBTENER GEOLOCALIZACION --> */
  async obtenerGeolocalizacion() {
    try {
      const location = await Geolocation.getCurrentPosition();
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;
      const accuracy = location.coords.accuracy;

      console.log('Latitud:', latitude);
      console.log('Longitud:', longitude);
      console.log('Precisión:', accuracy);


    } catch (error) {
      console.error('Error al obtener la geolocalización: ', error);
    }
  }

  

}
