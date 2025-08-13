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

  sortAsc = false;

  constructor(
    private postService: PostService,
    private subscriptionService: SubscriptionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
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

  toggleSort(): void {
    this.sortAsc = !this.sortAsc;
    this.applySort();
  }

  private applySort(): void {
    const dir = this.sortAsc ? 1 : -1;
    this.articles = [...this.articles].sort((a, b) => {
      const ad = this.extractDate(a);
      const bd = this.extractDate(b);
      return (ad - bd) * dir;
    });
  }

  private extractDate(a: Article): number {
    const candidateKeys = [
      'date',
      'createdAt',
      'created_at',
      'publishedAt',
      'updatedAt',
    ];
    for (const k of candidateKeys) {
      const v = (a as any)?.[k];
      if (v) return new Date(v).getTime();
    }
    return 0; // fallback so undefined dates sink to the bottom/top consistently
  }
}
