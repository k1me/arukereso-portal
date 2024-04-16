import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthUser, User } from '../interfaces/user';
import * as bcrypt from 'bcryptjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private db: AngularFirestore) {}

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

  async updatePassword(email: string, password: string) {
    try {
      await this.db
        .collection('Users')
        .doc(email)
        .update({
          password: this.hashValue(password),
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

  async getProducts() {
    try {
      const snapshot = await this.db.collection('Product').get().toPromise();
      if (snapshot) {
        return snapshot.docs.map((doc) => doc.data() as Product);
      }
      return [];
    } catch (error) {
      console.error('Nem sikerült lekérni az adatokat', error);
      throw error;
    }
  }

  async getProduct(id: string) {
    try {
      const snapshot = await this.db
        .collection('Product')
        .doc(id.toString())
        .get()
        .toPromise();
      if (snapshot) {
        return snapshot.data() as Product;
      }
      return {
        id: '',
        name: 'Nem ismert termék',
        price: 0,
        description: 'Nincs leírás',
        image: '',
        category: 'Ismeretlen',
      } as Product;
    } catch (error) {
      console.error('Nem sikerült lekérni az adatokat', error);
      throw error;
    }
  }

  async getProductsByCategory(category: string) {
    return this.db
      .collection('Products', (ref) => ref.where('category', '==', category))
      .valueChanges();
  }

  async addProduct(product: Product) {
    try {
      await this.db.collection('Product').doc(product.id).set(product);
    } catch (error) {
      throw error;
    }
  }
}
