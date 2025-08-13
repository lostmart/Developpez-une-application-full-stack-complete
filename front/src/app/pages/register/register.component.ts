// src/app/pages/register/register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  AuthService,
  RegisterPayload,
} from 'src/app/shared/services/auth.service';
import {
  strongPassword,
  matchPasswords,
} from 'src/app/shared/validators/password.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  hidePassword = true;
  hideConfirm = true;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, strongPassword()]],
        confirmPassword: ['', [Validators.required]],
        picture: [''], // optional
      },
      { validators: matchPasswords('password', 'confirmPassword') }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    console.log('running the register ...');
    // if (this.registerForm.invalid) {
    //   this.registerForm.markAllAsTouched();
    //   return;
    // }

    this.submitting = true;

    const payload: RegisterPayload = {
      username: this.f['username'].value,
      email: this.f['email'].value,
      password: this.f['password'].value,
      picture: this.f['picture'].value || null,
    };

    this.auth.register(payload).subscribe({
      next: (user) => {
        // user = { id, username, email, picture }
        this.snack.open(
          `Account created for ${user.username}. Please log in.`,
          'OK',
          { duration: 3000 }
        );
        this.router.navigate(['/login']);
      },
      error: (err) => {
        // Optional: map common backend errors (adjust as you wish)
        let message = 'Registration failed. Please try again.';
        const status = err?.status;
        const apiMsg = err?.error?.message || err?.error?.error;

        if (status === 409 || /already/i.test(apiMsg)) {
          message = 'This email is already in use.';
        } else if (status === 400) {
          message = apiMsg || 'Invalid data. Please check the form.';
        } else if (apiMsg) {
          message = apiMsg;
        }

        this.snack.open(message, 'Close', { duration: 4000 });
        this.submitting = false;
      },
      complete: () => (this.submitting = false),
    });
  }
}
