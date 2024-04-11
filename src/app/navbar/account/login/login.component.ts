import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  errorMessage: string = '';
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  reloadPage() {
    location.replace('/account');
  }

  async login() {
    const { email, password } = this.loginForm.value;
    await this.authService
      .login(email, password)
      .then((credential: any) => {
        const user = credential.user;
        const uid = user.uid;
        sessionStorage.setItem('session-cookie', uid);
        this.reloadPage();
      })
      .catch((error) => {
        this.errorMessage = 'Nem megfelelő email vagy jelszó.';
        console.error(error);
      });
  }
}
