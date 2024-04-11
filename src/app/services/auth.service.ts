import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import * as bcrypt from 'bcryptjs';

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

  async register(email: string, password: string) {
    try {
      const userCredentials = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      const uid = userCredentials.user?.uid;
      console.log('before');
      await this.db
        .collection('Users')
        .doc(uid)
        .set({
          email: email,
          password: this.hashedPassword(password),
          name: '',
          uid: uid,
        });
      console.log('before');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async login(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    try {
      return this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  }

  logout() {
    this.afAuth
      .signOut()
      .then(() => {
        sessionStorage.removeItem('session-cookie');
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
    const email = user?.email;
    if (email && password) {
      await this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          userCredential.user?.delete();
          console.log('sikeres törlés 1');
        })
        .then(() => {
          this.db
            .collection('Users')
            .doc(sessionStorage.getItem('session-cookie')?.toString())
            .delete();
          console.log('sikeres törlés 2');
        })
        .then(() => {
          sessionStorage.removeItem('session-cookie');
          //location.replace('');
          console.log('sikeres törlés 3');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
}
