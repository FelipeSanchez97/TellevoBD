import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-agregar-ruta',
  templateUrl: './agregar-ruta.page.html',
  styleUrls: ['./agregar-ruta.page.scss'],
})
export class AgregarRutaPage implements OnInit {
  ruta: any = {};
  rutaForm: FormGroup;


  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  constructor(private router: Router, private formBuilder: FormBuilder) {
    // Inicializa tu formulario reactivo
    this.rutaForm = this.formBuilder.group({
      // Define tus campos del formulario aquí
      origen: ['',],
      destino: ['',],
    });
  }

  ngOnInit() {
  }


  async guardarRuta() {
    try {
      // Suponiendo que el usuario actual tiene el rol de "conductor"
      const user = this.firebaseSvc.getAuth().currentUser;
      if (user) {
        this.ruta.conductorId = user.uid; // Asignar el ID del conductor a la ruta

        // Guardar la información de la ruta en Firebase
        await this.firebaseSvc.guardarRuta(this.ruta);
      }

      // Redirigir a la página home después de guardar la ruta
      this.router.navigate(['/main/home']);

      // Reiniciar el formulario después de la redirección
      this.rutaForm.reset();

    } catch (error) {
      console.error('Error al guardar la ruta:', error);
    }
  }

}
