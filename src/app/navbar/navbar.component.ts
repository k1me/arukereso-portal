import { Component } from '@angular/core';
import { SearchService } from '../shared/services/search.service';
import { NavigationEnd, Router, Event } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  searchTerm: string = '';
  currentUrl: string = '';
  disAllowedUrls: string[] = ['/account', '/cart']
  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }
  isSessionSet(): any {
    return sessionStorage.getItem('session-cookie');
  }

  searchProducts() {
    this.searchService.setSearchTerm(this.searchTerm);
  }

  isUrlAllowed():boolean {
    return !this.disAllowedUrls.some((url) => this.currentUrl.startsWith(url));
  }
}
