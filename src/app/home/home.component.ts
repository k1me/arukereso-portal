import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/interfaces/product';
import { Subscription } from 'rxjs';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private productSub: Subscription = new Subscription();
  loading = true;
  products: Product[] = [];
  categories: Set<string> = new Set();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.productSub = this.cartService.productsChanged.subscribe(() => {
      this.products = this.cartService.products;
      this.getCategories();
    });
  }

  async getAllData() {
    if (!(this.cartService.products.length === 0)) {
      this.products = this.cartService.products;
      this.loading = false;
    }
  }

  async getCategories() {
    await this.getAllData();
    for (const product of this.products) {
      this.categories.add(product.category);
    }
    this.loading = false;
  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
  }
}
