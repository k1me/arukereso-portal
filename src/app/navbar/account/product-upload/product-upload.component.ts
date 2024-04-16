import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrl: './product-upload.component.scss',
})
export class ProductUploadComponent implements OnInit {
  newProductForm: FormGroup = new FormGroup({});

  constructor(private db: DatabaseService, private formBuilder: FormBuilder) {}

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
    await this.db.addProduct(product);
    window.location.href = '/account/new-product';    
  }
}
