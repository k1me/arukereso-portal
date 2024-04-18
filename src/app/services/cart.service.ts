import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { DatabaseService } from './database.service';
import { Cart } from '../interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  order: Cart = {} as Cart;
  products: Product[] = [];

  constructor(private db: DatabaseService) {}

  ngOnInit() {
    this.order = this.db.order;
  }

  addToCart(product: Product) {
    this.products = JSON.parse(sessionStorage.getItem('cart') || '') || [];
    this.products.push(product);
    sessionStorage.setItem('cart', JSON.stringify(this.products));
  }

  getCart(id: string) {
    this.db.getOrder(id);
  }
  addOrder(cart: Product[], uid: string) {
    this.db.addOrder(cart, uid);
  }
}
