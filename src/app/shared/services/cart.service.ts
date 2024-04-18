import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Cart } from '../interfaces/cart';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { OrderService } from './order.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  order: Cart = {} as Cart;
  products: Product[] = [];
  productsChanged = new Subject<Product[]>();

  constructor(
    private db: AngularFirestore,
    private orderService: OrderService
  ) {
    this.getProducts();
  }

  addToCart(product: Product) {
    this.products = JSON.parse(sessionStorage.getItem('cart') || '') || [];
    this.products.push(product);
    sessionStorage.setItem('cart', JSON.stringify(this.products));
  }

  getCart(id: string) {
    this.orderService.getOrder(id);
  }
  addOrder(cart: Product[], uid: string) {
    this.orderService.addOrder(cart, uid);
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
}
