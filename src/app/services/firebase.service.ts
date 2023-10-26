import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail, getAuth } from 'firebase/auth'
import { User } from '../models/user.model'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore'
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsSvc = inject(UtilsService);
  
  



  // ====================================AUTENTICACION=========================================
  getAuth(){
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

  sendRecoveryEmail(email: string){
    return sendPasswordResetEmail(getAuth(), email)

  }

  // =====================CERRAR SESION==================

  signOut(){
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
