import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthUser } from '../interfaces/user';
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

  async getCategories() {
  }

  async getProducts(): Promise<Product[]> {
    try {
      const querySnapshot = await this.db.collection('Product').get().toPromise();
      const products: Product[] = [];
      if (querySnapshot) {
        querySnapshot.forEach((doc) => {
          const product = doc.data() as Product;
          products.push(product);
        });
      }
      return products;
    } catch (error) {
      console.error('Error getting products: ', error);
      throw error;
    }
  }

  async getProductsByCategory(category: string) {
    return this.db
      .collection('Products', (ref) => ref.where('category', '==', category))
      .valueChanges();
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
}
