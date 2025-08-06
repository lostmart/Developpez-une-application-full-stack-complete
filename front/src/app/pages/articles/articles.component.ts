import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/models/article.model';
import { Subscription } from 'src/app/shared/models/subscription.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PostService } from 'src/app/shared/services/post.service';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent {
  articles: Article[] = [];

  constructor(
    private postService: PostService,
    private subscriptionService: SubscriptionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('articles');
    
    const userId =
      Number(localStorage.getItem('user_id')) ||
      Number(this.authService.getUserId());

    this.subscriptionService
      .getUserSubscriptions(userId)
      .subscribe((subs: Subscription[]) => {
        this.postService
          .getPostsFromSubscriptions(subs)
          .subscribe((articles: Article[]) => {
            this.articles = articles;
          });
      });
  }
}
