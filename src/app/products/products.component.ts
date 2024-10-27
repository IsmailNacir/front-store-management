import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products!: Product[];
  errorMessage!: string;

  constructor(
    private _productService: ProductsService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getWeathers();
    this.getAllProducts();
  }

  getWeathers() {
    this._productService.getWeather().subscribe((data) => {
      let toto = data;
    });
  }

  getAllProducts() {
    this._productService.getAllPorducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errorMessage = err;
      },
    });
  }

  handleDelete(product: Product) {
    this._productService.deleteProduct(product.id).subscribe({
      next: () => {
        let indexOfProductToDelete = this.products.indexOf(product);
        this.products.splice(indexOfProductToDelete, 1);
      },

      error: (err) => {
        this.errorMessage = err;
      },
    });
  }

  handleSearch(form: any) {
    let searchTerm = form.value.searchTerm;

    this._productService.searchProduct(searchTerm).subscribe({
      next: (data) => {
        this.products = data;
      },
    });
  }
}
