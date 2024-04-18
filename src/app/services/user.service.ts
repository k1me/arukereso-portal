import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import { AuthUser, User } from '../interfaces/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }

  hashValue(value: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(value, salt);
    return hashedPassword;
  }

  async setUser(user: AuthUser, uid: string) {
    try {
      await this.db
        .collection('Users')
        .doc(user.email)
        .set({
          email: user.email,
          password: this.hashValue(user.password),
          firstName: '',
          lastName: '',
          registeredOn: new Date(),
          role: false,
          address: '',
          uid: uid,
        });
    } catch (error) {
      throw error;
    }
  }

  async getUser(email: string) {
    try {
        const snapshot = await this.db.collection('Users').doc(email).get().toPromise();
      if (snapshot) {
        return snapshot.data() as User;
      }
      return {};
    } catch (error) {
      console.error('Nem sikerült lekérni az adatokat', error);
      throw error;
    }
  }

  async updateUser(user: User) {
    try {
      await this.db.collection('Users').doc(user.email).update({
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(authUser: AuthUser) {
    try {
      await this.db
        .collection('Users')
        .doc(authUser.email)
        .update({
          password: this.hashValue(authUser.password),
        });
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(email: string) {
    try {
      await this.db.collection('Users').doc(email).delete();
    } catch (error) {
      throw error;
    }
  }
}
