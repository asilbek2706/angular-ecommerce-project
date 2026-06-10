import { Component, Input } from '@angular/core';
import { IProduct } from '../../interfaces/product';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, NgOptimizedImage],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() item: IProduct = {} as IProduct;
}
