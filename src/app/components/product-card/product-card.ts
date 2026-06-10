import { Component, inject, Input } from '@angular/core';
import { IProduct } from '../../interfaces/product';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, NgOptimizedImage, MatSnackBarModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() item: IProduct = {} as IProduct;
  private cartService = inject(CartService);
  private _snackBar = inject(MatSnackBar);

  addToCart(product: IProduct) {
    const cartItem = {
      product,
      quantity: 1,
    };

    this.cartService.addToCart(cartItem).subscribe({
      next: () => {
        this._snackBar.open('Mahsulot savatga qo\'shildi', 'OK', {
          duration: 2200,
          panelClass: ['product-toast'],
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      },
        error: (err) => {
          console.error('Error adding product to cart:', err);
          this._snackBar.open('Failed to add product to cart. Please try again.', 'Close', {
            duration: 3000,
            panelClass: ['product-toast', 'product-toast-error'],
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        },
    });
  }
}
