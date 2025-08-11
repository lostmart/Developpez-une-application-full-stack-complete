import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { Post } from '../models/post.model';
import { Article } from '../models/article.model';
import { Subscription } from '../models/subscription.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = `${environment.apiUrl}posts/topic-name`;
  private postUrl = `${environment.apiUrl}posts`;

  constructor(private http: HttpClient) {}

  // Fetch posts by a single topic name
  getPostsByTopic(topicName: string): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/${topicName}`);
  }

  // Fetch all posts from user subscriptions
  getPostsFromSubscriptions(
    subscriptions: Subscription[]
  ): Observable<Article[]> {
    const requests = subscriptions.map((sub) =>
      this.getPostsByTopic(sub.topicName)
    );

    return forkJoin(requests).pipe(
      map((results) => results.flat()) // Flatten array of arrays
    );
  }

  // create a new post
  createPost(payload: {
    title: string;
    content: string;
    topic: string;
  }): Observable<Article> {
    return this.http.post<Article>(this.postUrl, payload);
  }
}
