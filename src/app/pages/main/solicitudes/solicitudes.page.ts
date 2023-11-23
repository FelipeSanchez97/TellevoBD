import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.page.html',
  styleUrls: ['./solicitudes.page.scss'],
})
export class SolicitudesPage implements OnInit {

  viajesProgramados: any[] = [];
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  constructor() { }

  ngOnInit() {
    this.obtenerViajesProgramados();
  }

  obtenerViajesProgramados() {
    this.firebaseSvc.getViajesProgramados().subscribe((data: any[]) => {
      this.viajesProgramados = data;
    });
  }

  aceptarViaje(viaje: any) {
    this.firebaseSvc.actualizarEstadoViaje(viaje.id, 'aceptado')
      .then(() => {
        this.obtenerViajesProgramados(); // Actualizar la lista después de aceptar el viaje
      })
      .catch(error => {
        console.error('Error al aceptar el viaje:', error);
      });
  }

  rechazarViaje(viaje: any) {
    this.firebaseSvc.actualizarEstadoViaje(viaje.id, 'rechazado')
      .then(() => {
        this.obtenerViajesProgramados(); // Actualizar la lista después de rechazar el viaje
      })
      .catch(error => {
        console.error('Error al rechazar el viaje:', error);
      });
  }

}
