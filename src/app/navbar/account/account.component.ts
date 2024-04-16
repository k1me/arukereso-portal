import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
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
  
  constructor(private db: DatabaseService, private authService: AuthService) {
    this.getUserData();
  }

  async getUserData() {
    const email = await this.authService
      .getUser()
      .then((user) => user?.email || '');
    if (email) {
      await this.getUserFromFire(email);
    }
  }

  async getUserFromFire(email: string) {
    this.db.getUser(email).then((doc) => {
      const userData = doc as User;
      this.user = userData;
      this.user.registeredOn =
        userData.registeredOn instanceof firebase.firestore.Timestamp
          ? userData.registeredOn.toDate()
          : userData.registeredOn;
    });
  }
}
