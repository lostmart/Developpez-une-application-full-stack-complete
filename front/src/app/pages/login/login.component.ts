import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/shared/services/api.service';

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
    private api: ApiService
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
      console.log('Login data:', this.loginForm.value);
      // handle login logic
    }
  }

  goBack() {
    this.location.back();
  }
}
