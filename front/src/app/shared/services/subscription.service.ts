import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  BehaviorSubject,
  Observable,
  tap,
  shareReplay,
  catchError,
  throwError,
} from 'rxjs';
import { Subscription } from '../models/subscription.model';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  // ensure trailing slash consistency (either put it here or in environment)
  private apiUrl = `${environment.apiUrl}subscriptions`;

  private readonly subsSubject = new BehaviorSubject<Subscription[]>([]);
  readonly subs$ = this.subsSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Return the observable; keep cache/subject in sync
  loadUserSubscriptions(userId: number): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${this.apiUrl}/user/${userId}`).pipe(
      tap((subs) => this.subsSubject.next(subs)),
      shareReplay(1),
      catchError((err) => {
        // optional: clear or keep last known value
        // this.subsSubject.next([]);
        return throwError(() => err);
      })
    );
  }

  // Optional convenience that matches your earlier usage
  getUserSubscriptions(userId: number): Observable<Subscription[]> {
    return this.loadUserSubscriptions(userId);
  }

  subscribeToTopic(topicId: number, description: string) {
    return this.http
      .post<Subscription>(`${this.apiUrl}/subscribe/${topicId}`, {
        description,
      })
      .pipe(
        tap((newSub) =>
          this.subsSubject.next([...this.subsSubject.value, newSub])
        )
      );
  }

  unsubscribeFromTopic(topicId: number) {
    return this.http.delete<void>(`${this.apiUrl}/unsubscribe/${topicId}`).pipe(
      tap(() => {
        this.subsSubject.next(
          this.subsSubject.value.filter((s) => s.topicId !== topicId)
        );
      })
    );
  }
}
