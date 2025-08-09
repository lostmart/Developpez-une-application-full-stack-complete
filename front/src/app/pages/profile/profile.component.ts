import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { User } from 'src/app/shared/models/user.model';
import { Subscription } from 'src/app/shared/models/subscription.model';
import { Topic } from 'src/app/shared/models/topic.model';
import { TopicService } from 'src/app/shared/services/topic.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  topics: Topic[] = [];
  profileForm: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    public topicService: TopicService
  ) {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
    });
  }

  ngOnInit(): void {
    const token = this.auth.getToken();
    const userId = Number(localStorage.getItem('user_id'));

    this.userService.getUserById(userId).subscribe((user: User) => {
      console.log(user);
      this.profileForm.patchValue({
        username: user.username,
        email: user.email,
      });
    });

    this.topicService.getTopics(token!).subscribe({
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

    this.subscriptionService.getUserSubscriptions(userId).subscribe((subs) => {
      this.subscriptions = subs;
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Form data:', this.profileForm.value);
      // Call API or navigate
    }
  }

  // saveProfile(): void {
  //   if (this.profileForm.valid) {
  //     const updatedUser = this.profileForm.value;
  //     this.userService.updateUser(updatedUser).subscribe(() => {
  //       alert('Profile updated successfully!');
  //     });
  //   }
  // }

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

  // unsubscribe(topicId: number): void {
  //   const userId = Number(localStorage.getItem('user_id'));
  //   this.userService.unsubscribe(userId, topicId).subscribe(() => {
  //     this.subscriptions = this.subscriptions.filter(sub => sub.topic.id !== topicId);
  //   });
  // }
}
