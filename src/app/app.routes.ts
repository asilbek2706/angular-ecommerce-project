import { Routes } from '@angular/router';
import { Product } from './components/product/product';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: Product,
    title: 'Products',
  },
];
