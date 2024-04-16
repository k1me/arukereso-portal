import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { DatabaseService } from '../../services/database.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private routeSub: Subscription = new Subscription();
  private searchSub: Subscription = new Subscription();
  products: Product[] = [];
  category: string = '';
  searchTerm: string = '';

  constructor(
    private db: DatabaseService,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  async ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.category = params['category'];
      this.getProducts();
      this.filterProducts();
    });

    this.searchSub = this.searchService.searchTermChanged.subscribe(() => {
      this.searchProducts();
    });

    await this.getProducts();
  }

  async filterProducts() {
    const allProducts = this.db.products;
    if (this.category) {
      this.products = allProducts.filter(
        (product) => product.category === this.category
      );
    } else {
      this.products = allProducts;
    }
  }

  async getProducts() {
    this.products = this.db.products;
  }

  async searchProducts() {
    const allProducts = this.db.products;
    if (this.searchService.searchTerm) {
      this.products = allProducts.filter((product) =>
        product.name.toLowerCase().includes(this.searchService.searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(this.searchService.searchTerm.toLowerCase())
      );
    } else {
      this.products = allProducts;
    }
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
