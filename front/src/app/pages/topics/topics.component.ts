import { Component, OnInit } from '@angular/core';
import { combineLatest, map } from 'rxjs';
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

    // Seed the live subject with the user’s subscriptions
    this.subscriptionService.loadUserSubscriptions(userId).subscribe();

    // Derive topics with a boolean `subscribed` flag (join by ID)
    combineLatest([
      this.topicService.getTopics(token),
      this.subscriptionService.subs$,
    ])
      .pipe(
        map(([topicsData, subs]) => {
          const subscribedIds = new Set(subs.map((s) => s.topicId));
          return topicsData.map<Topic>((t) => ({
            ...t,
            subscribed: subscribedIds.has(t.id),
          }));
        })
      )
      .subscribe((withFlags) => (this.topics = withFlags));
  }

  handleSubscribe(topicId: number): void {
    const topic = this.topics.find((t) => t.id === topicId);
    if (!topic) return;

    this.subscriptionService
      .subscribeToTopic(topicId, topic.description ?? '')
      .subscribe();
  }

  trackByTopicId = (_: number, t: Topic) => t.id;
}
