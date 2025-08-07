import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss'],
})
export class MobileHeaderComponent {
  showMenu = false;

  constructor(private auth: AuthService, private router: Router) {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.auth.logout();
    this.toggleMenu();
    this.router.navigate(['/login']);
  }
}
