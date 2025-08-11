// post.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Article } from '../models/article.model';
import { Subscription } from '../models/subscription.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PostService {
  private apiUrl = `${environment.apiUrl}posts/topic-name`;
  private postUrl = `${environment.apiUrl}posts`;

  // simple cache by id
  private cache = new Map<number, Article>();

  constructor(private http: HttpClient) {}

  getPostsByTopic(topicName: string): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/${topicName}`).pipe(
      tap((articles) => {
        for (const a of articles) {
          if (a?.id != null) this.cache.set(a.id as number, a);
        }
      })
    );
  }

  getPostsFromSubscriptions(
    subscriptions: Subscription[]
  ): Observable<Article[]> {
    const requests = subscriptions.map((sub) =>
      this.getPostsByTopic(sub.topicName)
    );
    return forkJoin(requests).pipe(map((results) => results.flat()));
  }

  createPost(payload: {
    title: string;
    content: string;
    topic: string;
  }): Observable<Article> {
    return this.http.post<Article>(this.postUrl, payload).pipe(
      tap((a) => {
        if (a?.id != null) this.cache.set(a.id as number, a);
      })
    );
  }

  // NEW: cache-first getter by id
  getPost(id: number): Observable<Article> {
    const cached = this.cache.get(id);
    if (cached) return of(cached);
    return this.http.get<Article>(`${this.postUrl}/${id}`).pipe(
      tap((a) => {
        if (a?.id != null) this.cache.set(a.id as number, a);
      })
    );
  }
}
