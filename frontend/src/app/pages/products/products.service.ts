import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private api = 'http://localhost:4000/api/products';

  constructor(private http: HttpClient) {}

  createProduct(product: any, token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.api, product, { headers });
  }
  getProducts(page: number, limit: number, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.api}?page=${page}&limit=${limit}`, {
      headers,
    });
  }

  updateProduct(id: number, product: any, token: string) {
    return this.http.put<any>(`${this.api}/${id}`, product, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  deleteProduct(id: number, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.api}/${id}`, { headers });
  }
}
