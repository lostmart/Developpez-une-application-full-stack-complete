import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  backendStatus: 'online' | 'offline' | 'checking' | '' = 'checking';

  constructor(
    private api: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  // Simple test call to backend
  ngOnInit(): void {
    // ✅ If user already logged in, redirect
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/articles']);
      return; // Prevent running backend ping
    }

    this.api.pingBackend().subscribe({
      next: (res) => {
        this.backendStatus = 'online';
        console.log('Backend responded:', res);
        setTimeout(() => (this.backendStatus = ''), 1200);
      },
      error: () => {
        this.backendStatus = 'offline';
      },
    });
  }
}
