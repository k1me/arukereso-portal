import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../../../interfaces/user';
import firebase from 'firebase/compat/app';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  constructor(private db: AngularFirestore, private authService: AuthService) {}

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
    this.db
      .collection('Users')
      .doc(email)
      .get()
      .subscribe((doc) => {
        const userData = doc.data() as User;
        this.user.address = userData.address;
        this.user.email = userData.email;
        this.user.firstName = userData.firstName;
        this.user.lastName = userData.lastName;
        this.user.registeredOn =
          userData.registeredOn instanceof firebase.firestore.Timestamp
            ? userData.registeredOn.toDate()
            : userData.registeredOn;
        this.user.role = userData.role;
        this.user.uid = userData.uid;
      });
  }

  async setMissingData() {
    await this.db.collection('Users').doc(this.user.email).update({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      address: this.user.address,
    });
    this.authService.redirectTo('account/dashboard');
  }
}
