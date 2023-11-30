import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ver-rutas',
  templateUrl: './ver-rutas.page.html',
  styleUrls: ['./ver-rutas.page.scss'],
})
export class VerRutasPage implements OnInit {
  rutas: any[] = [];

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  constructor(private router: Router, private toastController: ToastController) { }

  ngOnInit() {
    // Obtener las rutas al cargar la página
    this.obtenerRutas();
  }

  obtenerRutas() {
    this.firebaseSvc.obtenerRutas().subscribe((data: any[]) => {
      // Asignar las rutas obtenidas desde Firebase al array local
      this.rutas = data;
    });
  }

  seleccionarRuta(ruta: any) {
    const currentUser = this.firebaseSvc.getAuth().currentUser;
    if (currentUser) {
      const pasajeroId = currentUser.uid;
      const rutaId = ruta.id; // Suponiendo que la ruta tiene un ID
      this.router.navigate(['main/home-pasajero']);
      this.mostrarToast('Gracias por escoger esta ruta. En minutos lo recogerá uno de nuestros conductores');
    }
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


