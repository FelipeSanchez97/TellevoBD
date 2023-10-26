import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])


  })
  constructor(private router: Router) { }



  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signIn(this.form.value as User).then(res => {

        this.getUserInfo(res.user.uid)

      }).catch(error => {
        console.error(error);

        this.utilsSvc.presentToast({
          message: 'Usuario o contraseña incorrectos. Revise porfavor',
          duration: 2500,
          color: 'tertiary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })

      }).finally(() => {
        loading.dismiss();
      })
    }
  }


  async getUserInfo(uid: string) {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `users/${uid}`;


      this.firebaseSvc.getDocument(path).then((user: User) => {

        this.utilsSvc.saveInLocalStorage('user', user);
        this.form.reset();

        const role = user.role; // Obtén el rol del usuario
        if (role === 'conductor') {
          this.utilsSvc.presentToast({
            message: `Bienvenido, ${user.name}`,
            duration: 1500,
            color: 'tertiary',
            position: 'middle',
            icon: 'person-circle-outline'
          });
          this.utilsSvc.routerLink('/main/home');
        } else if (role === 'pasajero') {
          this.utilsSvc.presentToast({
            message: `Bienvenido, ${user.name}`,
            duration: 1500,
            color: 'tertiary',
            position: 'middle',
            icon: 'person-circle-outline'
          });
          this.utilsSvc.routerLink('/main/home-pasajero');
        } 



      }).catch(error => {
        console.error(error);

        this.utilsSvc.presentToast({
          message: 'Usuario no valido',
          duration: 2500,
          color: 'tertiary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })

      }).finally(() => {
        loading.dismiss();
      })
    }
  }

}
