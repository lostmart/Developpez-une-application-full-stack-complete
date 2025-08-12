// single-article.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/shared/services/post.service';
import { Article } from 'src/app/shared/models/article.model';
import { CommentService } from 'src/app/shared/services/comment.service';
import { ApiComment as CommentDto } from 'src/app/shared/models/comment.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.scss'],
})
export class SingleArticleComponent {
  article$!: Observable<Article>;
  comments: CommentDto[] = [];
  postId!: number;

  submitting = false;
  error = '';

  commentForm = this.fb.group({
    content: ['', [Validators.required, Validators.maxLength(1000)]],
  });

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private fb: FormBuilder
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

  // Submit on Enter (unless Shift is held)
  maybeSubmit(event: KeyboardEvent) {
    if (!event.shiftKey) {
      event.preventDefault();
      this.submitComment();
    }
  }

  submitComment() {
    this.error = '';
    const text = this.commentForm.value.content?.trim();
    if (!text) return;

    this.submitting = true;

    this.commentService
      .create({ content: text, postId: this.postId })
      .subscribe({
        next: (created) => {
          // Optimistically prepend the new comment
          this.comments = [created, ...this.comments];
          this.commentForm.reset();
        },
        error: (err) => {
          this.error =
            err?.error?.message || 'Failed to add comment. Please try again.';
        },
        complete: () => {
          this.submitting = false;
        },
      });
  }
}
