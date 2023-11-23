import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-eliminar-ruta',
  templateUrl: './eliminar-ruta.page.html',
  styleUrls: ['./eliminar-ruta.page.scss'],
})
export class EliminarRutaPage implements OnInit {
  rutas: any[] = []; // Arreglo para almacenar las rutas del usuario actual

  constructor(private firebaseSvc: FirebaseService) { }

  ngOnInit() {
    this.obtenerRutasUsuario();
  }


  async obtenerRutasUsuario() {
    try {
      const user = this.firebaseSvc.getAuth().currentUser;
      if (user) {
        // Obtener las rutas del usuario actual usando el ID del usuario
        this.rutas = await this.firebaseSvc.obtenerRutasUsuario(user.uid);
      }
    } catch (error) {
      console.error('Error al obtener las rutas del usuario:', error);
    }
  }

  async eliminarRuta(idRuta: string) {
    try {
      // Eliminar la ruta específica de la base de datos usando su ID
      await this.firebaseSvc.eliminarRuta(idRuta);

      // Volver a cargar las rutas después de eliminar la ruta
      await this.obtenerRutasUsuario();
    } catch (error) {
      console.error('Error al eliminar la ruta:', error);
    }
  }
}
