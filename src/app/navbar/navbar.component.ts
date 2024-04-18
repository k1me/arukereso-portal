import { Component } from '@angular/core';
import { SearchService } from '../shared/services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  searchTerm: string = '';
  constructor(private searchService: SearchService) {}
  isSessionSet(): any {
    return sessionStorage.getItem('session-cookie');
  }

  searchProducts() {
    console.log(this.searchTerm)
    this.searchService.setSearchTerm(this.searchTerm);
  }
}
