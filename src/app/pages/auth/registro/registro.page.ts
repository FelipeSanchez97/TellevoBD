import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {


  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    role: new FormControl('', [Validators.required])



  })

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signUp(this.form.value as User).then(async res => {

        await this.firebaseSvc.updateUser(this.form.value.name)

        let uid = res.user.uid;
        this.form.controls.uid.setValue(uid);

        this.setUserInfo(uid);


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


  async setUserInfo(uid: string) {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      const user = this.form.value as User; // Obtén los valores del formulario

      // Elimina la contraseña del objeto de usuario antes de guardarlo en Firebase
      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;

      const path = `users/${uid}`;
      // Guarda la información en Firebase
      this.firebaseSvc.setDocument(path, userWithoutPassword).then(async () => {
        // Guarda el rol del usuario
        const rolePath = `userRoles/${uid}`;
        const userRole = { role: user.role }; // Guarda el rol en una ubicación específica
        await this.firebaseSvc.setDocument(rolePath, userRole);

        // Guarda la información del usuario en el almacenamiento local
        this.utilsSvc.saveInLocalStorage('user', user);
        // También guarda el rol en el almacenamiento local
        this.utilsSvc.saveInLocalStorage('role', user.role);
        this.utilsSvc.routerLink('auth');
        this.form.reset();

        this.utilsSvc.presentToast({
          message: 'Usuario creado con éxito',
          duration: 2500,
          color: 'success',
          position: 'middle',
          icon: 'checkmark-circle-outline'
        });


      }).catch(error => {
        console.error(error);
        this.utilsSvc.presentToast({
          message: 'Usuario no válido',
          duration: 2500,
          color: 'tertiary',
          position: 'middle',
          icon: 'alert-circle-outline'
        });
      }).finally(() => {
        loading.dismiss();
      });
    }
  }


}