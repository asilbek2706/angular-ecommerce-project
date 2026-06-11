import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';
import { ICart } from '../../interfaces/cart';
import { CdkObserveContent } from "@angular/cdk/observers";

@Component({
  selector: 'app-cart',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDividerModule, CurrencyPipe, CdkObserveContent],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  private cartService = inject(CartService);
  private cartSignal = signal<ICart[]>([]);

  cart = this.cartSignal.asReadonly();

  totalPrice = computed(() =>
    this.cart().reduce((total, item) => total + item.product.price * item.quantity, 0),
  );

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    this.cartService.getCartItems().subscribe({
      next: (cartItems) => this.cartSignal.set(cartItems),
      error: (err) => console.error('Cartni yuklashda xatolik:', err),
    });
  }

  private updatedQuantity(id: string, quantity: number) {
    this.cartService.updateCartItem(id, quantity).subscribe({
      next: (updatedItem) => {
        const updatedCart = this.cart().map((item) =>
          item.id === id ? { ...item, quantity: updatedItem.quantity } : item,
        );
        this.cartSignal.set(updatedCart);
      },
      error: (err) => console.error('Miqdorni yangilashda xatolik:', err),
    });
  }

  increase(cartId: string, currentQuantity: number) {
    this.updatedQuantity(cartId, currentQuantity + 1);
  }

  decrease(cartId: string, currentQuantity: number) {
    if (currentQuantity > 1) {
      this.updatedQuantity(cartId, currentQuantity - 1);
    }
  }

  remove(cartId: string) {
    this.cartService.removeFromCart(cartId).subscribe({
      next: () => {
        const updatedCart = this.cart().filter((item) => item.id !== cartId);
        this.cartSignal.set(updatedCart);
      },
    });
  }

  clear() {
    this.cartSignal().forEach(cart => {
      this.cartService.removeFromCart(cart.id).subscribe();
    })
    this.cartSignal.set([]);
  }
}
