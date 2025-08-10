import { Component, OnInit } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Subscription as AppSubscription } from 'src/app/shared/models/subscription.model';
import { Topic } from 'src/app/shared/models/topic.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { TopicService } from 'src/app/shared/services/topic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  topics: Topic[] = [];
  subs$!: Observable<AppSubscription[]>; // from the service

  constructor(
    private topicService: TopicService,
    private auth: AuthService,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    const token = this.auth.getToken();
    const userId =
      this.auth.getUserId() || Number(localStorage.getItem('user_id'));
    if (!token) return;

    // start the stream of user subscriptions
    this.subscriptionService.loadUserSubscriptions(userId);
    this.subs$ = this.subscriptionService.subs$;

    // recompute `topics` whenever subs change
    this.topicService
      .getTopics(token)
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

  handleSubscribe(topicId: number): void {
    const topic = this.topics.find((t) => t.id === topicId);
    if (!topic) return;

    this.subscriptionService
      .subscribeToTopic(topicId, topic.description ?? '')
      .subscribe({
        next: () => {
          // no manual flip needed; subs$ updates -> topics recomputed
        },
        error: (err) => console.error('Failed to subscribe:', err),
      });
  }

  trackByTopicId = (_: number, t: Topic) => t.id;
}
