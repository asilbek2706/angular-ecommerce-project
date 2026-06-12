import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map, mergeMap, Observable, tap } from 'rxjs';
import { ICart } from '../interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private cartSignal = signal<ICart[]>([]);

  cart = this.cartSignal.asReadonly();
  cartItemCount = computed(() => this.cart().reduce((total, item) => total + item.quantity, 0));

  constructor() {
    this.loadCart();
  }

  loadCart(): void {
    this.http.get<ICart[]>(`${this.apiUrl}/cart`).subscribe({
      next: (cartItems) => this.cartSignal.set(cartItems),
      error: (err) => console.error('Cartni yuklashda xatolik:', err),
    });
  }

  getCartItems(): Observable<ICart[]> {
    return this.http.get<ICart[]>(`${this.apiUrl}/cart`);
  }

  addToCart(cart: Omit<ICart, 'id'>, productId: number): Observable<boolean> {
    return this.getCartItems().pipe(
      mergeMap((carts) => {
        const existCart = carts.find((item) => item.product.id == productId);
        if (!existCart) {
          return this.addCart(cart).pipe(map(() => true));
        } else {
          return this.updateQuantity(existCart.id, existCart.quantity + 1).pipe(map(() => false));
        }
      }),
    );
  }

  addCart(cart: Omit<ICart, 'id'>): Observable<ICart> {
    return this.http.post<ICart>(`${this.apiUrl}/cart`, cart).pipe(
      tap((createdItem) => {
        this.cartSignal.update((items) => [...items, createdItem]);
      }),
    );
  }

  removeFromCart(cartId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cart/${cartId}`).pipe(
      tap(() => {
        this.cartSignal.update((items) => items.filter((item) => item.id !== cartId));
      }),
    );
  }

  updateCartItem(cartItemId: string, quantity: number): Observable<ICart> {
    return this.http.patch<ICart>(`${this.apiUrl}/cart/${cartItemId}`, { quantity }).pipe(
      tap((updatedItem) => {
        this.cartSignal.update((items) =>
          items.map((item) =>
            item.id === cartItemId ? { ...item, quantity: updatedItem.quantity } : item,
          ),
        );
      }),
    );
  }

  updateQuantity(cartId: string, quantity: number): Observable<ICart> {
    return this.http.patch<ICart>(`${this.apiUrl}/cart/${cartId}`, { quantity }).pipe(
      tap((updatedItem) => {
        this.cartSignal.update((items) =>
          items.map((item) =>
            item.id === cartId ? { ...item, quantity: updatedItem.quantity } : item,
          ),
        );
      }),
    );
  }
}
