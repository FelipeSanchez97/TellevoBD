import { Injectable } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private firebaseSvc: FirebaseService) {}

  async getUserRole(uid: string): Promise<string | null> {
    const rolePath = `userRoles/${uid}`;
    const roleData = await this.firebaseSvc.getDocument(rolePath);
    if (roleData && roleData['role']) {
      return roleData['role'];
    }
    return null;
  }
}
