// single-article.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/shared/services/post.service';
import { Article } from 'src/app/shared/models/article.model';
import { CommentService } from 'src/app/shared/services/comment.service';
import { ApiComment as CommentDto } from 'src/app/shared/models/comment.model';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.scss'],
})
export class SingleArticleComponent {
  article$!: Observable<Article>;
  comments: CommentDto[] = [];
  postId: number = 18;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('articleId'));
      this.postId = id;

      this.commentService
        .getByPost(this.postId)
        .subscribe((cs) => (this.comments = cs)); // cs: CommentDto[]

      this.article$ = this.postService.getPost(id);
    });
  }

  onAddComment(text: string) {
    this.commentService
      .create({ content: text, postId: this.postId })
      .subscribe((c) => (this.comments = [c, ...this.comments]));
  }
}
