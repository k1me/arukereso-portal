import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/compat/auth';
import * as bcrypt from 'bcryptjs';
import { AuthUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  hashedPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  }

  clearSessionCookie() {
    sessionStorage.removeItem('session-cookie');
  }

  redirectTo(endpoint: string) {
    location.replace('/' + endpoint);
  }

  async register(user: AuthUser) {
    try {
      const userCredentials = await this.afAuth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      const uid = userCredentials.user?.uid;
      await this.db
        .collection('Users')
        .doc(uid)
        .set({
          email: user.email,
          password: this.hashedPassword(user.password),
        });
      this.redirectTo('login');
    } catch (error) {
      throw error;
    }
  }

  async login(userData: AuthUser) {
    try {
      const credentials = await this.afAuth.signInWithEmailAndPassword(
        userData.email,
        userData.password
      );
      this.processLogin(credentials);
      this.redirectTo('account/dashboard');
    } catch (error) {
      throw error;
    }
  }

  processLogin(credentials: any) {
    const user = credentials.user;
    const uid = user.uid;
    sessionStorage.setItem('session-cookie', uid);
  }

  logout() {
    this.afAuth
      .signOut()
      .then(() => {
        this.clearSessionCookie();
      })
      .then(() => {
        location.replace('');
      })
      .catch((error) => {
        console.error(error);
      });
  }
  changePassword(email: string, oldPassword: string, newPassword: string) {}

  async deleteAccount(password: string) {
    const user = await this.afAuth.currentUser;
    if (user) {
      try {
        await user.delete();
        await this.deleteAccountFromFire();
      } catch (error) {
        console.error(error);
      }
      location.replace('');
    }
  }

  async deleteAccountFromFire() {
    try {
      await this.db
        .collection('Users')
        .doc(sessionStorage.getItem('session-cookie') || '')
        .delete();
      this.clearSessionCookie();
    } catch (error) {
      console.error('Error deleting user from Firestore:', error);
    }
  }
}
