import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Product[] = [];

  constructor() { }

  addToCart(product: Product) {
    this.cart.push(product);
    console.log(this.cart);
  }

  getCart() {
    return this.cart;
  }
}
