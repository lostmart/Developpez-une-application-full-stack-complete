import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  backendStatus: 'online' | 'offline' | 'checking' = 'checking';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.pingBackend().subscribe({
      next: () => {
        this.backendStatus = 'online';
      },
      error: () => {
        this.backendStatus = 'offline';
      },
    });
  }

  start() {
    alert('Commencez par lire le README et à vous de jouer !');
  }
}
