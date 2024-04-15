import { Component } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { DatabaseService } from '../../../services/database.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  product: Product = {
    category: '',
    description: '',
    id: 0,
    image: '',
    name: '',
    price: 0,
  };

  constructor(private db: DatabaseService,
    private route: ActivatedRoute
  ) {
    this.getProduct();
  }

  getProductId(): string {
    const id = this.route.snapshot.paramMap.get('id');
    return id ? id : '0';
  }

  async getProduct() {
    this.product = await this.db.getProduct(this.getProductId());

  }
}
