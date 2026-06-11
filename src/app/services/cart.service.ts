import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ICart } from '../interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getCartItems(): Observable<ICart[]> {
    return this.http.get<ICart[]>(`${this.apiUrl}/cart`);
  }

  addToCart(cartItem: Omit<ICart, 'id'>): Observable<ICart> {
    return this.http.post<ICart>(`${this.apiUrl}/cart`, cartItem);
  }

  removeFromCart(cartId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cart/${cartId}`);
  }

  updateCartItem(cartItemId: string, quantity: number): Observable<ICart> {
    return this.http.patch<ICart>(`${this.apiUrl}/cart/${cartItemId}`, { quantity });
  }
}
