import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: Product[] = [];

  constructor(private db: DatabaseService) {}

  addToCart(product: Product) {
    this.cart = JSON.parse(sessionStorage.getItem('cart') || '') || [];
    this.cart.push(product);
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
    console.log(this.cart);
  }

  getCart() {
    return this.cart;
  }
  addOrder(cart: Product[], uid: string) {
    this.db.addOrder(cart, uid);
  }
}
