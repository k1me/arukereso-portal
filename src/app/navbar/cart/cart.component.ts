import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  cart: Product[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(){
    this.cart = this.cartService.cart;
  }
}
