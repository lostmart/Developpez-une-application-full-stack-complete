import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { User } from 'src/app/shared/models/user.model';
import { Subscription } from 'src/app/shared/models/subscription.model';
import { Topic } from 'src/app/shared/models/topic.model';
import { TopicService } from 'src/app/shared/services/topic.service';
import { AuthService } from 'src/app/shared/services/auth.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, switchMap } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  subs$!: Observable<Subscription[]>; // set later
  topics: Topic[] = [];

  constructor(
    private auth: AuthService,
    private topicService: TopicService,
    private subscriptionService: SubscriptionService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('user_id'));
    const token = this.auth.getToken();

    // 1) Bind the UI stream once
    this.subs$ = this.subscriptionService.subs$;

    // 2) Trigger the fetch once
    this.subscriptionService.loadUserSubscriptions(userId).subscribe({
      error: () => {
        // optional: show a toast if you’ve injected MatSnackBar
        // this.snack.open('Failed to load subscriptions', 'Close', { duration: 3000 });
      },
    });

    // 3) Your topics mapping stays the same
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

  onSubmit() {
    // Call API or navigate
  }

  onUnsubscribe(topicId: number): void {
    this.subscriptionService.unsubscribeFromTopic(topicId).subscribe();
  }

  trackBySubId = (_: number, s: Subscription) => s.id ?? s.topicId;

  trackByTopicId = (_: number, t: Topic) => t.id;
}
