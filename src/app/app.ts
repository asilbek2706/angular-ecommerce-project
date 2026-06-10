import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from './components/product/product';
import { Navbar } from "./components/shared/navbar/navbar";
import { Footer } from './components/shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('e-commerce-project');
}
