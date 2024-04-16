import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  products: Product[] = [];
  categories: string[] = [];

  ngOnInit(): void {}

  constructor(private db: DatabaseService) {
    this.getCategories();
  }

  async getAllData() {
    this.products = await this.db.getProducts();
    console.log(this.products);
  }

  async getCategories() {
    await this.getAllData();
    for (const product of this.products) {
      this.categories.push(product.category);
    }
    console.log(this.categories);
  }
}
