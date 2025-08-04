import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // Simple test call to backend
  pingBackend(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, { responseType: 'text' });
  }
}
