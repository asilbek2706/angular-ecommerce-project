import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from './components/product/product';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Product],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('e-commerce-project');
}
