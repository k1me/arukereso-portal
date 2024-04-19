import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
})
export class PasswordComponent implements OnInit {
  passwordForm: FormGroup = new FormGroup({});
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      newPasswordRe: ['', Validators.required],
    });
  }

  changePassword() {
    const { oldPassword, newPassword, newPasswordRe } = this.passwordForm.value;
    if (newPassword !== newPasswordRe) {
      this.errorMessage = 'A két jelszó nem egyezik.';
      return;
    }
    if (newPassword === '' || newPasswordRe === '') {
      this.errorMessage = 'Nincs megadva új jelszó.';
      return;
    }
    this.validatePassword(oldPassword);
  }

  async validatePassword(oldPassword: string) {
    const user = await this.afAuth.currentUser;
    if (!user) {
      alert('Nincs bejelentkezett felhasználó!');
      throw new Error('Nincs bejelentkezett felhasználó!');
    }
    const email = user.email;
    if (!email || oldPassword === '') {
      alert('Nincs jelszó megadva!')
      throw new Error('Nincs jelszó megadva!');
    }
    await this.changeOldPassword(email, oldPassword);
  }

  async changeOldPassword(email: string, oldPassword: string) {
    await this.afAuth
      .signInWithEmailAndPassword(email, oldPassword)
      .then(() => {
        this.authService.changePassword(this.passwordForm.value.newPassword);
      });
  }
}
