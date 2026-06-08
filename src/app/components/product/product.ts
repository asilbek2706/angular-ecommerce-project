import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.html',
  styleUrl: './product.css',
  imports: [CurrencyPipe, NgOptimizedImage]
})
export class Product {
  productService = inject(ProductService);
  products = toSignal(this.productService.getProducts(), { initialValue: [] });
}
