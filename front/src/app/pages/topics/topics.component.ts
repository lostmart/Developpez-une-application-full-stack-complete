import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/shared/models/topic.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TopicService } from 'src/app/shared/services/topic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  topics: Topic[] = [];

  constructor(private topicService: TopicService, private auth: AuthService) {}

  ngOnInit(): void {
    const token = this.auth.getToken();
    if (token) {
      this.topicService.getTopics(token).subscribe({
        next: (data) => (this.topics = data),
        error: (err) => console.error('Failed to fetch topics:', err),
      });
    } else {
      console.warn('No token found. Redirecting to login...');
    }
  }
}
