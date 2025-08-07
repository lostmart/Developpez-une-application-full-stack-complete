import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss'],
})
export class MobileHeaderComponent {
  showMenu = false;

  @ViewChild('menuRef') menuRef!: ElementRef;

  constructor(public authService: AuthService, private router: Router) {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.authService.logout();
    this.toggleMenu();
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = this.menuRef?.nativeElement.contains(event.target);
    const clickedButton = (event.target as HTMLElement).closest('button');

    if (!clickedInside && !clickedButton) {
      this.showMenu = false;
    }
  }
}
