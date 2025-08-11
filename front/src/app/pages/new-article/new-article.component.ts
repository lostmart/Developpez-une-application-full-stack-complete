import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss'],
})
export class NewArticleComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private snack: MatSnackBar,
     private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      topic: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  submit(): void {
    if (this.form.invalid || this.loading) return;
    this.loading = true;

    const { title, content, topic } = this.form.value;
    this.postService.createPost({ title, content, topic }).subscribe({
      next: () => {
        this.snack.open('Article créé ✅', 'OK', { duration: 2000 });
        this.router.navigate(['/articles']); // adjust if you want to go elsewhere
      },
      error: () => {
        this.loading = false;
        this.snack.open('Erreur lors de la création', 'Fermer', {
          duration: 3000,
        });
      },
    });
  }
}
