import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  dummy: string[] = ['dummy1', 'dummy2', 'dummy3', 'dummy4', 'dummy5', 'dummy6', 'dummy7', 'dummy8', 'dummy9', 'dummy10'];

  ngOnInit(): void {}

  constructor() {}

}
