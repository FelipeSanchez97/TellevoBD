import { Router } from '@angular/router';
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

  ngOnInit() { }


  // Añade este método para obtener el rol del usuario y redirigirlo
  async redirectToAppropriatePage() {
    const uid = this.firebaseSvc.getAuth().currentUser.uid;
    const role = await this.firebaseSvc.getUserRole(uid);

    if (role === 'pasajero') {
      // El usuario es un pasajero, redirige a la página de pasajero
      this.utilsSvc.routerLink('/main/home-pasajero');
    } else if (role === 'conductor') {
      // El usuario es un conductor, redirige a la página principal
      this.utilsSvc.routerLink('/main/home');
    }
  }

  // El método para cerrar sesión y redirigir a la página de inicio de sesión
  signOut() {
    this.firebaseSvc.signOut();
  }




}
