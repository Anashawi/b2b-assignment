import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { OrdersService } from './order.service';
import { AuthService } from '../../core/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  error = '';

  constructor(
    private ordersService: OrdersService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    const token = this.auth.getToken();
    if (!token) {
      this.error = 'Not authenticated';
      return;
    }

    this.ordersService.getOrders(token).subscribe({
      next: (res) => (this.orders = res),
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load orders';
      },
    });
  }

  deleteOrder(id: number) {
    if (!confirm('Are you sure you want to delete this order?')) return;

    const token = this.auth.getToken();
    if (!token) return;

    this.ordersService.deleteOrder(id, token).subscribe({
      next: () => {
        this.orders = this.orders.filter((o) => o.id !== id);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to delete order';
      },
    });
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }
  trackById(index: number, item: any): number {
    return item.id;
  }
}
