import { Component, EventEmitter, Output } from '@angular/core';
import * as screenfull from 'screenfull';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  @Output() toggleSideNav: EventEmitter<void> = new EventEmitter<void>();
  @Output() toggleNotificationSideNav = new EventEmitter<void>();

  constructor(private authService: AuthService,
    private router: Router) {
  }

  fullScreenToggle(): void {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  }

  logOut() {
    this.authService.signOut().then(() => this.router.navigate(['/login']));
  }

}
