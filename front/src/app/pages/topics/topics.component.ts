import { Component, OnInit } from '@angular/core';
import { Subscription } from 'src/app/shared/models/subscription.model';
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

  subscriptions: Subscription[] = [];

  constructor(
    private topicService: TopicService,
    private auth: AuthService,
    private subscriptionService: SubscriptionService
  ) {}

  handleSubscribe(topicId: number): void {
    const topic = this.topics.find((t) => t.id === topicId);
    if (!topic) {
      console.error('Topic not found:', topicId);
      return;
    }

    this.subscriptionService
      .subscribeToTopic(topicId, topic.description ?? '')
      .subscribe({
        next: () => {
          topic.subscribed = true; // mark locally as subscribed
        },
        error: (err) => {
          console.error('Failed to subscribe:', err);
        },
      });
  }

  ngOnInit(): void {
    const token = this.auth.getToken();
    const userId =
      this.auth.getUserId() || Number(localStorage.getItem('user_id'));

    if (!token) {
      console.warn('No token found. Redirecting to login...');
      return;
    }

    this.topicService.getTopics(token).subscribe({
      next: (topicsData) => {
        this.subscriptionService.getUserSubscriptions(userId).subscribe({
          next: (subs) => {
            this.subscriptions = subs;
            const subscribedTopicNames = subs.map((s) => s.topicName);

            this.topics = topicsData.map((topic) => ({
              ...topic,
              subscribed: subscribedTopicNames.includes(topic.name),
            }));
          },
          error: (err) => {
            console.error('Error fetching subscriptions', err);
            this.topics = topicsData; // Fallback: show topics without subscription info
          },
        });
      },
      error: (err) => console.error('Failed to fetch topics:', err),
    });
  }
}
