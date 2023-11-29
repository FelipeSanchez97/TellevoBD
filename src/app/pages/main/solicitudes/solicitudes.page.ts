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

  async aceptarViaje(viaje: any) {
    // Aquí podrías realizar acciones adicionales antes de redireccionar, si es necesario
    // Por ejemplo, podrías actualizar el estado del viaje en Firebase

    // Redireccionar a la página principal
    await this.router.navigate(['main/home']);

    // Mostrar mensaje
    const toast = await this.toastController.create({
      message: 'Haz aceptado el viaje. Por favor, sé puntual',
      duration: 4000, // Duración del mensaje en milisegundos
      position: 'middle' // Posición del mensaje en la pantalla
    });
    await toast.present();
  }
}
  

  




