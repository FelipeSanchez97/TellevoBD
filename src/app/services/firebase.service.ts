import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail, getAuth } from 'firebase/auth'
import { User } from '../models/user.model'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, collection, query, where, deleteDoc, getDocs } from '@angular/fire/firestore'
import { UtilsService } from './utils.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsSvc = inject(UtilsService);





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
    const user = getAuth().currentUser;
    if (user) {
      ruta.idPasajero = user.uid; // Asociar el UID del pasajero con el viaje
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

  // METODO PARA ACTUALIZAR LA RUTA PROGRAMADA
  async actualizarEstadoRutaProgramada(idRuta: string, nuevoEstado: string): Promise<void> {
    const rutaDoc = doc(getFirestore(), 'rutaprogramada', idRuta);
    await setDoc(rutaDoc, { estado: nuevoEstado }, { merge: true });
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



