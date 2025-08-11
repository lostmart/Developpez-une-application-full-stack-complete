// single-article.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/shared/services/post.service';
import { Article } from 'src/app/shared/models/article.model';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.scss'],
})
export class SingleArticleComponent {
  article$!: Observable<Article>;
  postId: number = 18;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.article$ = this.route.paramMap.pipe(
      switchMap((params) =>
        this.postService.getPost(Number(params.get('articleId')))
      )
    );
  }
}
