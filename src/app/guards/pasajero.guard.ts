import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class PasajeroGuard implements CanActivate {
  constructor(
    private firebaseSvc: FirebaseService,
    private router: Router
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const user = this.firebaseSvc.getAuth().currentUser;
    if (user) {
      const userRole = await this.firebaseSvc.getUserRole(user.uid);
      if (userRole === 'pasajero') {
        return true; // Permite el acceso a la ruta para usuarios pasajeros
      } else {
        return this.router.createUrlTree(['/main/home']);
      }
    }
    return this.router.createUrlTree(['/auth']);
  }
}
