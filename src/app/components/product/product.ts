import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product',
  templateUrl: './product.html',
  styleUrl: './product.css',
  imports: [ProductCard],
})
export class Product {
  productService = inject(ProductService);
  products = toSignal(this.productService.getProducts(), { initialValue: [] });
}
