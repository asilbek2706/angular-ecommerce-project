import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { IProduct } from '../interfaces/product';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Service()
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiUrl}/products`);
  }
}
