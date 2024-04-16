import { Component } from '@angular/core';
import { User } from '../../../interfaces/user';
import firebase from 'firebase/compat/app';
import { AuthService } from '../../../services/auth.service';
import { DatabaseService } from '../../../services/database.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  constructor(private authService: AuthService, private db: DatabaseService) {}

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

  async ngOnInit() {
    await this.getUserData();
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

  async setMissingData() {
    await this.db.updateUser(this.user);
    this.authService.redirectTo('account/dashboard');
  }
}
