import { Component } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { DatabaseService } from '../../../services/database.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/cart.service';

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

  constructor(private db: DatabaseService, private route: ActivatedRoute, private cartService: CartService) {
    this.getProduct();
  }

  getProductId(): string {
    const id = this.route.snapshot.paramMap.get('id');
    return id ? id : '0';
  }

  async getProduct() {
    this.product = await this.db.getProduct(this.getProductId());
  }

  addToCart() {
    console.log(this.product)
    this.cartService.addToCart(this.product);
  }
}
