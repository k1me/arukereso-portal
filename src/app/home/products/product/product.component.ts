import { Component } from '@angular/core';
import { Product } from '../../../shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../shared/services/cart.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  product: Product = {
    category: '',
    description: '',
    id: '',
    image: '',
    name: '',
    price: 0,
  };

  constructor(private route: ActivatedRoute, private cartService: CartService, private authService: AuthService) {
    this.getProduct();
  }

  getProductId(): string {
    const id = this.route.snapshot.paramMap.get('id');
    return id ? id : '0';
  }

  async getProduct() {
    this.product = await this.cartService.getProduct(this.getProductId());
  }

  addToCart() {
    if (!sessionStorage.getItem('cart')) {
      alert("Jelentkezzen be a termék kosárhoz adásához!");
    }
      console.log(this.authService.dbUser);
      this.cartService.addToCart(this.product);
      alert("Ez a termék hozzá lett adva a kosarához: " + this.product.name);
  }
}
