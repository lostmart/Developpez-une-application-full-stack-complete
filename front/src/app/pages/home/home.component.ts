import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  backendStatus: 'online' | 'offline' | 'checking' | '' = 'checking';

  constructor(private api: ApiService) {}

  // Simple test call to backend
  ngOnInit(): void {
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
