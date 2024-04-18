import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-deletion',
  templateUrl: './deletion.component.html',
  styleUrl: './deletion.component.scss',
})
export class DeletionComponent {
  deletionForm: FormGroup = new FormGroup({});
  errorMessage: string = '';
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.deletionForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }

  async deleteAccount() {
    const { password } = this.deletionForm.value;
    try {
      await this.validatePassword(password);
    } catch (error) {
      //console.error('Hiba a fiók törlése során:', error);
      this.errorMessage = 'Nem megfelelő jelszó.';
    }
  }

  async validatePassword(password: string) {
    const user = await this.afAuth.currentUser;
    if (!user) {
      throw new Error('Nincs bejelentkezett felhasználó.');
    }
    const email = user.email;
    if (!email || password === '') {
      throw new Error('Nincs jelszó megadva.');
    }
    await this.DeleteUser(email, password);
  }

  async DeleteUser(email: string, password: string) {
    await this.afAuth.signInWithEmailAndPassword(email, password).then(() => {
      this.authService.deleteAccount();
    });
  }
}
