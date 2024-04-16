import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import 'firebase/compat/auth';
import { AuthUser, User } from '../interfaces/user';
import { DatabaseService } from './database.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUser: AuthUser = {} as AuthUser;
  dbUser: User = {} as User;

  constructor(private afAuth: AngularFireAuth, private db: DatabaseService, private router: Router) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.setSessionCookie('set', user.uid);
      }
    });
  }

  setSessionCookie(command: string, value?: string) {
    switch (command) {
      case 'set':
        sessionStorage.setItem('session-cookie', value || '');
        break;
      case 'clear':
        sessionStorage.removeItem('session-cookie');
        break;
      default:
        break;
    }
  }

  redirectTo(endpoint: string) {
    this.router.navigate([endpoint]);
  }

  async register(user: AuthUser) {
    try {
      const userCredentials = await this.afAuth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      await this.db.setUser(user, userCredentials.user?.uid || '');
      this.redirectTo('login');
    } catch (error) {
      throw error;
    }
  }

  async login(userData: AuthUser) {
    try {
      const userCredentials = await this.afAuth.signInWithEmailAndPassword(
        userData.email,
        userData.password
      );
      this.setSessionCookie('set', userCredentials.user?.uid);
      this.dbUser = await this.db.getUser(userData.email) as User;
      this.redirectTo('account/dashboard');
    } catch (error) {
      throw error;
    }
  }

  logout() {
    try {
      this.afAuth.signOut();
      this.setSessionCookie('clear');
      this.redirectTo('login');
    } catch (error) {
      throw error;
    }
  }
  async changePassword(newPassword: string) {
    const user = await this.afAuth.currentUser;
    if (user) {
      await user.updatePassword(newPassword);
      await this.db.updatePassword(user.email || '', newPassword);
      this.setSessionCookie('clear');
      this.redirectTo('login');
    }
  }

  async deleteAccount() {
    const user = await this.afAuth.currentUser;
    if (user) {
      await user.delete();
      await this.db.deleteUser(user.email || '');
      this.setSessionCookie('clear');
      this.redirectTo('login');
    }
  }

  async getUser() {
    const user = await this.afAuth.currentUser; 
    return user;
  }
}
