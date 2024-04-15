import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit{
  progressBar = document.getElementById('progress-bar');
  progress: number = 0;

  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
  }


  async updateProgress() {
  }
}
