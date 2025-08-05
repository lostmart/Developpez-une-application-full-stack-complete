import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Topic {
  id: number;
  name: string;
  creator_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  private apiUrl = 'http://localhost:8080/api/topics';

  constructor(private http: HttpClient) {}

  getTopics(token: string): Observable<Topic[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Topic[]>(this.apiUrl, { headers });
  }
}
