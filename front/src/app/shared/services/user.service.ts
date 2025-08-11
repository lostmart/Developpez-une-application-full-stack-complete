import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Subscription } from '../models/subscription.model';

export interface UpdateUserPayload {
  username: string;
  email: string;
  password?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}subscriptions`;
  private usersUrl = `${environment.apiUrl}users`;

  constructor(private http: HttpClient) {}

  getUserSubscriptions(userId: number): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${this.apiUrl}/user/${userId}`);
  }

  // unsubscribe(userId: number, topicId: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/user/${userId}/topic/${topicId}`);
  // }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${userId}`);
  }

  updateUser(userId: number, payload: UpdateUserPayload): Observable<User> {
    return this.http.put<User>(`${this.usersUrl}/${userId}`, payload);
  }
}
