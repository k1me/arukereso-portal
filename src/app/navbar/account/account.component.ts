import { Component } from '@angular/core';
import { User } from '../../shared/interfaces/user';
import { AuthService } from '../../shared/services/auth.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  userRole: boolean = false;
  user: User = {
    uid: '',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    role: false,
    registeredOn: new Date(),
    password: '',
  };

  constructor(private authService: AuthService) {
    this.userRole = sessionStorage.getItem('user-role') === 'true';
  }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    const user = this.authService.dbUser;
    if (user) {
      this.user = user;
      this.user.registeredOn =
        user.registeredOn instanceof firebase.firestore.Timestamp
          ? user.registeredOn.toDate()
          : user.registeredOn;
    }
  }
}
