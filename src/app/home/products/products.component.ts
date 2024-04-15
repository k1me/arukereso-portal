import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  products: Product[] = [];

  constructor(private db: DatabaseService) {
    this.getProducts();
  }

  async getProducts() {
      this.products = await this.db.getProducts();
  }
}
