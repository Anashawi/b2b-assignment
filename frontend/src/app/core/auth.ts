import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  api = 'http://localhost:4000/api';
  tokenKey = 'b2b_token';
  user$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    const t = localStorage.getItem(this.tokenKey);
    if (t) this.setToken(t);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    try {
      const decoded: JwtPayload & { role?: string } =
        jwtDecode<JwtPayload>(token);
      this.user$.next(decoded);
    } catch {
      this.user$.next(null);
    }
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.user$.next(null);
  }

  async login(username: string, password: string) {
    try {
      const res = await firstValueFrom(
        this.http.post<any>(`${this.api}/auth/login/`, { username, password })
      );
      localStorage.setItem('user', JSON.stringify(res.user));
      this.setToken(res.token);
      return res;
    } catch (err: any) {
      if (err.status === 401) {
        throw new Error(err.error?.message || 'Invalid credentials');
      }
      throw err;
    }
  }

  getRole(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role : null;
  }
}
