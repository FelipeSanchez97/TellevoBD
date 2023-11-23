import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-ver-rutas',
  templateUrl: './ver-rutas.page.html',
  styleUrls: ['./ver-rutas.page.scss'],
})
export class VerRutasPage implements OnInit {
  rutas: any[] = [];

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  constructor(private router: Router) { }

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
    }
  }

}
