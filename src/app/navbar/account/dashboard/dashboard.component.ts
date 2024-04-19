import { Component } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  progressBar: number = 0;
  progressCntr: number = 0;
  maxProgress: number = 3;
  progress: number = 0;
  user: User = {} as User;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    await this.getUser();
  }

  async getUser() {
    const user = await this.authService.getUser();
    if (user) {
      this.userService.getUser(user.email || '').then((result) => {
        this.user = result as User;
        this.updateProgress();
      });
    }
  }

  updateProgress() {
    if (this.user.address !== '') {
      this.progressCntr += 1;
    }
    if (this.user.firstName !== '') {
      this.progressCntr += 1;
    }
    if (this.user.lastName !== '') {
      this.progressCntr += 1;
    }

    this.progressBar = (this.progressCntr / this.maxProgress) * 100;
    this.progress = Math.round(this.progressBar);
  }
}
