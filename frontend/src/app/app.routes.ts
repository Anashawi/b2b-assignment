import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products';
import { OrdersComponent } from './pages/orders/orders';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'orders', component: OrdersComponent },
];
