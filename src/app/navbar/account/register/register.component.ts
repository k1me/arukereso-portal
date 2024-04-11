import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUser } from '../../../interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async register() {
    if (this.registerForm.invalid) {
      return;
    }

    const userData: AuthUser = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    try {
      await this.authService.register(userData);
    } catch (error) {
      console.log(error);
    }
  }
}
