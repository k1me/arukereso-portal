import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchTerm: string = '';
  searchTermChanged = new Subject<string>();

  constructor() {}

  setSearchTerm(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.searchTermChanged.next(this.searchTerm);
  }

}
