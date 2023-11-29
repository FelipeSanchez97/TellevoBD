import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-viaje-programado',
  templateUrl: './viaje-programado.page.html',
  styleUrls: ['./viaje-programado.page.scss'],
})
export class ViajeProgramadoPage implements OnInit {
  rutaForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private firebaseSvc: FirebaseService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.rutaForm = this.formBuilder.group({
      salida: ['', Validators.required],
      destino: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
    });
  }

  async crearRuta() {
    if (this.rutaForm.valid) {
      const { salida, destino, fecha, hora } = this.rutaForm.value;
      const ruta = { salida, destino, fecha, hora };
  
      try {
        await this.firebaseSvc.guardarRutaProgramada(ruta);
        await this.mostrarMensaje('Ruta de viaje creada. En espera de aceptación del conductor.');
        this.router.navigate(['/main/home-pasajero']);
      } catch (error) {
        console.error('Error al crear la ruta:', error);
      }
    } else {
      // Si el formulario es inválido, muestra un mensaje de error
      console.log('Por favor, completa todos los campos.');
    }
  }
  
  async mostrarMensaje(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Exito!',
      message: mensaje,
      buttons: ['OK']
    });
  
    await alert.present();
  }
}
