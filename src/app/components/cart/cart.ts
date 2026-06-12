import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDividerModule, CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  private cartService = inject(CartService);

  cart = this.cartService.cart;

  totalPrice = computed(() =>
    this.cart().reduce((total, item) => total + item.product.price * item.quantity, 0),
  );

  private updatedQuantity(id: string, quantity: number) {
    this.cartService.updateCartItem(id, quantity).subscribe({
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
      error: (err) => console.error('O‘chirishda xatolik:', err),
    });
  }

  clear() {
    this.cart().forEach((cart) => {
      this.cartService.removeFromCart(cart.id).subscribe({
        error: (err) => console.error('Savatchani tozalashda xatolik:', err),
      });
    });
  }
}
