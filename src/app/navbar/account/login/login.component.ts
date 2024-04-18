import { Component} from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUser } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
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

  async login() {
    if (this.loginForm.invalid) {
      return;
    }

    const userData: AuthUser = {
      password: this.loginForm.value.password,
      email: this.loginForm.value.email,
    };

    try {
      await this.authService.login(userData);
    } catch (error) {
      this.errorMessage = 'Nem megfelelő email vagy jelszó.';
    }
  }
}
