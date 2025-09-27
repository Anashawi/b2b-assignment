import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ProductsService } from './products.service';
import { AuthService } from '../../core/auth';
import { AddProductModalComponent } from './add-product-modal/add-product-modal.component';
import { OrdersService } from '../orders/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  cart: { [id: number]: number } = {};

  error = '';
  currentPage = 1;
  pageSize = 3;
  totalItems = 0;
  totalPages = 0;

  constructor(
    private productService: ProductsService,
    private orderService: OrdersService,
    public auth: AuthService,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    const token = this.auth.getToken() || '';
    this.productService
      .getProducts(this.currentPage, this.pageSize, token)
      .subscribe({
        next: (res) => {
          this.products = res.items;
          this.totalItems = res.total;
          this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        },
        error: (err) => {
          console.error('❌ Error loading products:', err);
          this.error = 'Failed to load products';
        },
      });
  }

  async addNewProduct() {
    const modal = await this.modalCtrl.create({
      component: AddProductModalComponent,
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'save') {
      const token = this.auth.getToken() || '';
      this.productService.createProduct(data, token).subscribe({
        next: () => this.loadProducts(),
        error: (err) => {
          console.error(err);
          this.error = 'Failed to create product';
        },
      });
    }
  }

  async editProduct(p: any) {
    const modal = await this.modalCtrl.create({
      component: AddProductModalComponent,
      componentProps: { product: { ...p } },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'update') {
      const token = this.auth.getToken() || '';
      this.productService.updateProduct(p.id, data, token).subscribe({
        next: () => this.loadProducts(),
        error: (err) => {
          console.error(err);
          this.error = 'Failed to update product';
        },
      });
    }
  }

  deleteProduct(p: any) {
    if (!confirm(`Are you sure you want to delete "${p.name}"?`)) return;
    const token = this.auth.getToken();
    if (!token) {
      this.error = 'Not authenticated';
      return;
    }
    this.productService.deleteProduct(p.id, token).subscribe({
      next: () => this.loadProducts(),
      error: (err) => {
        console.error(err);
        this.error = 'Failed to delete product';
      },
    });
  }

  // Cart
  addToCart(p: any) {
    if (!this.cart[p.id]) this.cart[p.id] = 1;
  }
  increaseQuantity(p: any) {
    this.cart[p.id]++;
  }
  decreaseQuantity(p: any) {
    if (this.cart[p.id] > 1) this.cart[p.id]--;
    else delete this.cart[p.id];
  }
  getQuantity(p: any): number {
    return this.cart[p.id] || 0;
  }
  hasItemsInCart(): boolean {
    return Object.keys(this.cart).length > 0;
  }
  getCartTotalItems(): number {
    return Object.values(this.cart).reduce((sum, qty) => sum + qty, 0);
  }
  placeOrder() {
    const token = this.auth.getToken();
    if (!token) {
      this.error = 'You must be logged in to place an order';
      return;
    }

    // Transform cart into backend-friendly structure
    const products = Object.keys(this.cart).map((id) => ({
      productId: +id,
      quantity: this.cart[+id],
    }));

    const body = {
      customerName: this.auth.user$.value?.username || 'Guest',
      status: 'pending',
      products,
    };

    this.orderService.createOrder(body, token).subscribe({
      next: (res) => {
        console.log('✅ Order placed:', res);
        this.cart = {}; // clear cart
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        console.error('❌ Error placing order:', err);
        this.error = 'Failed to place order';
      },
    });
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }
  goToLogin() {
    localStorage.removeItem('b2b_token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // Pagination
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }
}
