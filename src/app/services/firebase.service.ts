import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail, getAuth } from 'firebase/auth'
import { User } from '../models/user.model'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, collection, query, where, deleteDoc, getDocs } from '@angular/fire/firestore'
import { UtilsService } from './utils.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private ultimoID: number = 0;
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsSvc = inject(UtilsService);

  constructor() {
    // Al inicializar el servicio, obtén el último ID
    this.obtenerUltimoID();
  }





  // ====================================AUTENTICACION=========================================
  getAuth() {
    return getAuth();

  }

  // =============ACCEDER=============
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // =============REGISTRAR=============

  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // ============ACTUALIZAR USUARIO==============

  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName })


  }

  //===========ENVIAR EMAIL PARA RESTABLECER CONTRASEÑA================

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email)

  }

  // =====================CERRAR SESION==================

  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/auth')
  }

  // Método para obtener el rol del usuario
  async getUserRole(uid: string): Promise<string | null> {
    const rolePath = `userRoles/${uid}`;
    const roleData = await this.getDocument(rolePath);
    if (roleData && roleData['role']) {
      return roleData['role'];
    }
    return null;
  }

  //Metodo para almacenar la ruta del conductor
  guardarRuta(ruta: any) {
    const rutaRef = this.firestore.collection('rutas').doc();
    return rutaRef.set(ruta);
  }

  // =====================ELIMINAR RUTA ==================
  async obtenerRutasUsuario(uid: string): Promise<any[]> {
    const rutaCollection = collection(getFirestore(), 'rutas');
    const q = query(rutaCollection, where('conductorId', '==', uid));

    const snapshot = await getDocs(q);
    const rutas: any[] = [];

    snapshot.forEach((doc) => {
      rutas.push({ id: doc.id, ...doc.data() });
    });

    return rutas;
  }

  async eliminarRuta(idRuta: string): Promise<void> {
    const rutaDoc = doc(getFirestore(), 'rutas', idRuta);
    await deleteDoc(rutaDoc);
  }

  // =====================VER RUTAS==================
  obtenerRutas(): Observable<any[]> {
    return this.firestore.collection('rutas').valueChanges();
  }

  // =====================RUTAS VIAJES PROGRAMADOS==================
  guardarRutaProgramada(ruta: any) {
    const user = getAuth().currentUser; // Obtener el usuario actual
    if (user) {
      ruta.idPasajero = user.uid; // Asociar el UID del pasajero con el viaje
      this.ultimoID++; // Incrementar el último ID
      ruta.id = this.ultimoID; // Asignar el ID al viaje programado
      ruta.estado = 'Pendiente'; // Establecer el estado predeterminado como 'Pendiente'
      // Guardar el viaje programado en Firestore con el nuevo ID, ID del pasajero y estado
      return this.firestore.collection('rutaprogramada').add(ruta);
    } else {
      return Promise.reject(new Error('No se pudo obtener el usuario actual.'));
    }
  }


  // =====================VER VIAJES PROGRAMADOS==================
  getViajesProgramados(): Observable<any[]> {
    return this.firestore.collection('rutaprogramada').valueChanges();
  }

  // =====================VER VIAJES PROGRAMADOS PASAJEROS==================
  getViajesProgramadosPorPasajero(pasajeroId: string): Observable<any[]> {
    return this.firestore.collection('rutaprogramada', ref => ref.where('idPasajero', '==', pasajeroId)).valueChanges();
  }



  // Método para obtener el último ID de los viajes programados
  private obtenerUltimoID() {
    this.firestore.collection('rutaprogramada', ref => ref.orderBy('id', 'desc').limit(1))
      .valueChanges()
      .pipe(
        map((viajes: any[]) => {
          if (viajes.length > 0) {
            this.ultimoID = viajes[0].id;
          } else {
            this.ultimoID = 0;
          }
        })
      )
      .subscribe();
  }
  

  // Método para actualizar el estado del viaje programado al ser aceptado por el conductor
  actualizarEstadoViajeAceptado(idViaje: string) {
    const docRef = this.firestore.collection('rutaprogramada').doc(idViaje);
    return docRef.update({ estado: 'Aceptado' })
      .then(() => {
        console.log('Estado del viaje actualizado a Aceptado');
      })
      .catch((error) => {
        console.error('Error al actualizar el estado del viaje:', error);
      });
  }
  


  // =====================BASE DE DATOS==================

  // =====================SETEAR UN DOCUMENTO==================
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);

  }

  // =====================OBTENER UN DOCUMENTO==================
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

}



