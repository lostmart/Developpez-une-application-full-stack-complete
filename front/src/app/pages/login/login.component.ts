import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

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
    private auth: AuthService // ✅ Inject auth service
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
        email: this.loginForm.value.identifier, // 👈 maps to backend `email`
        password: this.loginForm.value.password,
      };

      this.auth.login(credentials).subscribe({
        next: (res) => {
          console.log('Login success:', res);
          // TODO: Store token, navigate, etc.
        },
        error: (err) => {
          console.error('Login failed:', err);
          // TODO: show error in UI
        },
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
