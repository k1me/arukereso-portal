import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
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

  constructor(private db: DatabaseService, private authService: AuthService) {}

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
