import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/cart';
import { Product } from '../interfaces/product';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders: Cart[] = [];
  order: Cart = {} as Cart;

  constructor(private db: AngularFirestore) { }

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
