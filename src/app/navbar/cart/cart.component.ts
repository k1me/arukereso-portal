import { Component } from '@angular/core';
import { Product } from '../../shared/interfaces/product';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  cart: Product[] = [];
  error: string = '';

  constructor(private cartService: CartService) { }

  ngOnInit(){
    this.cart = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart') || '') : [];
  }

  checkOut() {
    const uid = sessionStorage.getItem('session-cookie');
    if (uid && this.cart.length > 0) {
    this.cartService.addOrder(this.cart, uid);
    alert('Köszönjük a vásárlást!')
    } else {
      this.error = 'Nincs bejelentkezve!';
    }
  }

  removeFromCart(id: string) {
    const index = this.cart.findIndex(product => product.id === id);
    if(index !== -1) {
      this.cart.splice(index, 1);
    }
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
