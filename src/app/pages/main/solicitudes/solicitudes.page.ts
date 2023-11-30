import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.page.html',
  styleUrls: ['./solicitudes.page.scss'],
})
export class SolicitudesPage implements OnInit {

  viajesProgramados: any[] = [];
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  constructor(firebaseSvc: FirebaseService, utilsSvc: UtilsService, private router: Router,
    private toastController: ToastController) {
    this.firebaseSvc = firebaseSvc;
    this.utilsSvc = utilsSvc;
  }

  ngOnInit() {
    this.obtenerViajesProgramados();
  }

  obtenerViajesProgramados() {
    this.firebaseSvc.getViajesProgramados().subscribe((data: any[]) => {
      this.viajesProgramados = data;
    });
  }

  aceptarViaje(viaje: any) {
    this.firebaseSvc.actualizarEstadoViajeAceptado(viaje.id) // Asegúrate de usar 'vid' si cambiaste el nombre
      .then(() => {
        console.log('Estado del viaje actualizado a Aceptado');
        this.router.navigate(['main/home']); // Redirecciona a 'main/home'
        this.mostrarToast('Viaje aceptado. Por favor sea puntual en la hora solicitada');
      })
      .catch((error) => {
        console.error('Error al actualizar el estado del viaje:', error);
      });
  }
  
  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 4000, // Duración del mensaje en milisegundos
      position: 'middle' // Posición del mensaje en la pantalla (puede ser 'top', 'middle', o 'bottom')
    });
    toast.present();
  }

}







