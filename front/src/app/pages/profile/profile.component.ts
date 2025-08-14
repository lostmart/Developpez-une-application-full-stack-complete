import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  UpdateUserPayload,
  UserService,
} from 'src/app/shared/services/user.service';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { User } from 'src/app/shared/models/user.model';
import { Subscription } from 'src/app/shared/models/subscription.model';
import { Topic } from 'src/app/shared/models/topic.model';
import { TopicService } from 'src/app/shared/services/topic.service';
import { AuthService } from 'src/app/shared/services/auth.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, switchMap, take, finalize } from 'rxjs';
import { strongPassword } from 'src/app/shared/validators/password.validators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  subs$!: Observable<Subscription[]>;
  topics: Topic[] = [];

  loadingUser = false;
  saving = false;

  constructor(
    private auth: AuthService,
    private topicService: TopicService,
    private subscriptionService: SubscriptionService,
    private userService: UserService,
    private fb: FormBuilder,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, strongPassword()]],
    });

    const userId =
      Number(localStorage.getItem('user_id')) || Number(this.auth.getUserId());

    const token = this.auth.getToken();

    // ---- preload user into form
    this.loadingUser = true;
    this.userService
      .getUserById(userId)
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          this.profileForm.patchValue({
            username: user.username,
            email: user.email,
            // no passwords here !
          });
          this.profileForm.markAsPristine();
        },
        error: () =>
          this.snack.open('Failed to load user profile', 'Close', {
            duration: 3000,
          }),
        complete: () => (this.loadingUser = false),
      });

    // ---- subscriptions stream for the list
    this.subs$ = this.subscriptionService.subs$;

    // trigger load once
    this.subscriptionService.loadUserSubscriptions(userId).subscribe({
      error: () =>
        this.snack.open('Failed to load subscriptions', 'Close', {
          duration: 3000,
        }),
    });

    // ---- topics + subscribed mapping
    this.topicService
      .getTopics(token!)
      .pipe(
        switchMap((topicsData) =>
          this.subs$.pipe(
            map((subs) => {
              const subscribedNames = new Set(subs.map((s) => s.topicName));
              return topicsData.map((t) => ({
                ...t,
                subscribed: subscribedNames.has(t.name),
              }));
            })
          )
        )
      )
      .subscribe((mapped) => (this.topics = mapped));
  }

  get f() {
    return this.profileForm.controls;
  }

  onSubmit() {
    if (this.profileForm.invalid) return;

    const userId =
      Number(localStorage.getItem('user_id')) || Number(this.auth.getUserId());
    const pwd = this.f['password'].value?.trim();

    const payload: UpdateUserPayload = {
      username: this.f['username'].value,
      email: this.f['email'].value,
      ...(pwd ? { password: pwd } : {}),
    };

    this.saving = true;

    this.userService
      .updateUser(userId, payload)
      .pipe(
        take(1),
        finalize(() => {
          this.saving = false;
          this.f['password'].reset('');
        })
      )
      .subscribe({
        next: () => {
          this.snack.open('Profile updated', 'Close', { duration: 2500 });
          this.profileForm.markAsPristine();
        },
        error: () => {
          this.snack.open('Failed to update profile', 'Close', {
            duration: 2000,
          });
        },
      });
  }

  onUnsubscribe(topicId: number): void {
    this.subscriptionService.unsubscribeFromTopic(topicId).subscribe({
      error: () =>
        this.snack.open('Unsubscribe failed', 'Close', { duration: 3000 }),
    });
  }

  trackBySubId = (_: number, s: Subscription) => s.id ?? s.topicId;
  trackByTopicId = (_: number, t: Topic) => t.id;
}
