import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private api = 'http://localhost:4000/api/orders';

  constructor(private http: HttpClient) {}

  createOrder(order: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.api, order, { headers });
  }
  getOrders(token: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.api, { headers });
  }

  deleteOrder(id: number, token: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.api}/${id}`, { headers });
  }
}
