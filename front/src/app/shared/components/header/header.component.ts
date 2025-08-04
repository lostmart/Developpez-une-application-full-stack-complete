import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private location: Location,
    public authService: AuthService,
    private router: Router
  ) {}

  goBack(): void {
    this.location.back();
  }

  logout(): void {
    this.authService.logout(); // Clears token
    this.router.navigate(['/']);
  }

  ngOnInit(): void {}
}
