import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-deletion',
  templateUrl: './deletion.component.html',
  styleUrl: './deletion.component.scss',
})
export class DeletionComponent implements OnInit {
  deletionForm: FormGroup = new FormGroup({});
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

  redirect() {
    location.replace('');
  }

  async delete() {
    const { password } = this.deletionForm.value;
    const user = await this.afAuth.currentUser;
    const email = user?.email;
    console.log(email, password);
    if (email && password !== '') {
      await this.afAuth.signInWithEmailAndPassword(email, password).then(() => {
        this.authService.deleteAccount(password);
      });
    console.log("itt vagyunk2");

    }
    console.log("itt vagyunk3");

  }
}
