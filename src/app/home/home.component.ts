import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { DatabaseService } from '../services/database.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  loading = true;
  products: Product[] = [];
  private productSub: Subscription = new Subscription();

  categories: Set<string> = new Set();

  constructor(private db: DatabaseService) {}

  ngOnInit(): void {
    this.productSub = this.db.productsChanged.subscribe(() => {
      this.products = this.db.products;
      this.getCategories();
    });
  }

  async getAllData() {
    if (!(this.db.products.length === 0)) {
      this.products = this.db.products;
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
