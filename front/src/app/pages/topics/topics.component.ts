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
    this.subscriptionService.subscribeToTopic(topicId).subscribe({
      next: () => {
        const topic = this.topics.find((t) => t.id === topicId);
        if (topic) {
          topic.subscribed = true;
        }
      },
      error: (err) => {
        console.error('Failed to subscribe:', err);
      },
    });
  }

  ngOnInit(): void {
    const token = this.auth.getToken();
    const userId = 11; // TODO: Replace with dynamic ID from AuthService if possible

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
