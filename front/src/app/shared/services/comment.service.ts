import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { ApiComment, CreateCommentPayload } from '../models/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private apiUrl = `${environment.apiUrl}comments`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  // If you already set the Authorization header via an interceptor, remove `headers: this.authHeaders()`.
  private authHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
  }

  /** GET /api/comments/post/:postId */
  getByPost(postId: number): Observable<ApiComment[]> {
    return this.http.get<ApiComment[]>(`${this.apiUrl}/post/${postId}`, {
      headers: this.authHeaders(),
    });
  }

  /** POST /api/comments */
  create(payload: CreateCommentPayload): Observable<ApiComment> {
    return this.http.post<ApiComment>(this.apiUrl, payload, {
      headers: this.authHeaders(),
    });
  }

  /** DELETE /api/comments/:id */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.authHeaders(),
    });
  }
}
