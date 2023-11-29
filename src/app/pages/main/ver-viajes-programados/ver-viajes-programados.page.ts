import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-ver-viajes-programados',
  templateUrl: './ver-viajes-programados.page.html',
  styleUrls: ['./ver-viajes-programados.page.scss'],
})
export class VerViajesProgramadosPage implements OnInit {
  viajesProgramados: any[] = [];

  constructor(private firebaseSvc: FirebaseService) {}

  ngOnInit() {
    this.obtenerViajesProgramadosUsuario();
  }

  obtenerViajesProgramadosUsuario() {
    const user = this.firebaseSvc.getAuth().currentUser;
    if (user) {
      this.firebaseSvc.getViajesProgramadosPorPasajero(user.uid)
        .subscribe((viajes: any[]) => {
          this.viajesProgramados = viajes.map(viaje => ({
            ...viaje,
            estado: viaje.estado ? `Aceptado por ${viaje.estado}` : 'Pendiente'
          }));
        });
    }
  }

  
}

