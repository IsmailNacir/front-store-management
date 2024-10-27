import { Injectable } from '@angular/core';
import { PageProduct, Product } from '../models/product.model';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Product[] = [];
  totalPage!: number;
  apiUrl = 'http://localhost:7117/weatherforecast';

  constructor(private httpClient: HttpClient) {
    this.products.push({ id: UUID.UUID(), name: 'Dell Latitude', price: 100 });
    this.products.push({ id: UUID.UUID(), name: 'HP EliteBook', price: 200 });
    this.products.push({ id: UUID.UUID(), name: 'Lenovo Legion', price: 300 });
    this.products.push({ id: UUID.UUID(), name: 'Asus Rog Strix', price: 750 });

    let totalPage = ~~this.products.length / 5;
    if (this.products.length % 5 != 0) {
      totalPage++;
    }
  }

  getAllPorducts(): Observable<Array<Product>> {
    let rnd = Math.random();

    if (rnd > 0.9)
      return throwError(() => new Error('Getting products failed'));

    return of(this.products);
  }

  getWeather(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }

  /*getPagePorducts(page: number, size: number): Observable<PageProduct> {
   
   

  }*/

  deleteProduct(productId: string): Observable<boolean> {
    this.products.filter((p) => p.id != productId);

    return of(true);
  }

  searchProduct(searchTerm: string): Observable<Array<Product>> {
    let products = this.products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return of(products);
  }
}
