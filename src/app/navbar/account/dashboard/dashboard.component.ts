import { Component } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  progressBar = document.getElementById('progress-bar');
  progress: number = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  async updateProgress() {}
}
