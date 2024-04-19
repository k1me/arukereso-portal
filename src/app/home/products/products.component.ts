import { Component } from '@angular/core';
import { Product } from '../../shared/interfaces/product';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../shared/services/search.service';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private routeSub: Subscription = new Subscription();
  //private searchSub: Subscription = new Subscription();
  products: Product[] = [];
  category: string = '';
  searchTerm: string = '';

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.category = params['category'];
      this.getProducts();
      this.filterProducts();
    });

    this.searchService.searchTermChanged.subscribe(() => {
      this.searchProducts();
    });
  }

  async filterProducts() {
    const allProducts = this.cartService.products;
    if (this.category) {
      this.products = allProducts.filter(
        (product) => product.category === this.category
      );
    } else {
      this.products = allProducts;
    }
  }

  getProducts() {
    this.products = this.cartService.products;
  }

  async searchProducts() {
    const allProducts = this.cartService.products;
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
