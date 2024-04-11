import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  constructor(private authService: AuthService) {}

  redirect() {
    location.replace('');
  }

  logout() {
    this.authService.logout();
    this.redirect();
  }

}
