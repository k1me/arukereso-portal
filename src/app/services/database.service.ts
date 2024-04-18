import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthUser, User } from '../interfaces/user';
import * as bcrypt from 'bcryptjs';
import { Product } from '../interfaces/product';
import { Subject } from 'rxjs';
import { Cart } from '../interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  products: Product[] = [];
  productsChanged = new Subject<Product[]>();
  orders: Cart[] = [];
  order: Cart = {} as Cart;

  constructor(private db: AngularFirestore) {
    this.getProducts();
  }

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

  async getProducts() {
    try {
      const snapshot = await this.db.collection('Product').get().toPromise();
      if (snapshot) {
        this.products = snapshot.docs.map((doc) => doc.data() as Product);
        this.productsChanged.next(this.products);
      }
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

  async addOrder(cart: Product[], uid: string) {
    const id = this.db.createId();
    let total: number = 0;
    for (let product of cart) {
      total += Number(product.price);
      console.log(typeof product.price);
    }
    try {
      await this.db.collection('Orders').add({
        uid: uid,
        products: cart.map((product) => {
          return {
            id: product.id,
            name: product.name,
            price: product.price,
          };
        }),
        date: new Date(),
        total: total,
        id: id,
      });
      sessionStorage.setItem('cart', JSON.stringify([]));
    } catch (error) {
      throw error;
    }
  }

  async getOrders(uid: string) {
    try {
      const snapshot = await this.db
        .collection('Orders', (ref) => ref.where('uid', '==', uid))
        .get()
        .toPromise();
      if (snapshot) {
         this.orders =  snapshot.docs.map((doc) => doc.data() as Cart);
      }
    } catch (error) {
      console.error('Nem sikerült lekérni az adatokat', error);
      throw error;
    }
  }

  async getOrder(id: string) {
    try {
      const snapshot = await this.db
        .collection('Orders', (ref) => ref.where('id', '==', id))
        .get()
        .toPromise();
      if (snapshot && snapshot.docs.length > 0) {
        this.order = snapshot.docs[0].data() as Cart;
        console.log(this.order);
      } else {
        console.log('Nincs ilyen id-val rendelkező rendelés', id);
      }
    } catch (error) {
      console.error('Nem sikerült lekérni az adatokat', error);
      throw error;
    }
  }
}
