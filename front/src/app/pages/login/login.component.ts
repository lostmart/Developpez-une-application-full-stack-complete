import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private api: ApiService,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.api.pingBackend().subscribe({
      next: (res) => console.log('Backend responded:', res),
      error: (err) => console.error('Error contacting backend:', err),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.value.identifier,
        password: this.loginForm.value.password,
      };

      this.auth.login(credentials).subscribe({
        next: (res) => {
          if (res.accessToken) {
            this.auth.storeToken(res.accessToken);
            this.snackBar.open('Connexion réussie 🎉', 'Fermer', {
              duration: 3000,
              panelClass: 'snackbar-success',
            });
            setTimeout(() => this.router.navigate(['/topics']), 500);
          } else {
            this.snackBar.open('Réponse invalide du serveur.', 'Fermer', {
              duration: 3000,
              panelClass: 'snackbar-error',
            });
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          this.snackBar.open(
            'Identifiants incorrects ou erreur serveur ❌',
            'Fermer',
            {
              duration: 3000,
              panelClass: 'snackbar-error',
            }
          );
        },
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
