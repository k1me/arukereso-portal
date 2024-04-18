import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../shared/interfaces/product';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrl: './product-upload.component.scss',
})
export class ProductUploadComponent implements OnInit {
  newProductForm: FormGroup = new FormGroup({});

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.newProductForm = this.formBuilder.group({
      category: ['', Validators.required],
      description: ['', Validators.required],
      id: ['', Validators.required],
      image: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  async uploadProduct() {
    const product: Product = this.newProductForm.value;
    await this.cartService.addProduct(product);
    window.location.href = '/account/new-product';
  }
}
