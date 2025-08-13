import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  picture?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}users`;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  storeToken(token: string, userId: number): void {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_id', userId.toString());
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getUserId(): number | null {
    const id = localStorage.getItem('user_id');
    return id ? Number(id) : null;
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  register(payload: RegisterPayload): Observable<any> {
    console.log(payload);
    return this.http.post(`${this.apiUrl}/register`, payload);
  }
}
