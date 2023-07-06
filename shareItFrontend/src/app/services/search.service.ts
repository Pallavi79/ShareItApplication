import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }
  private searchTermSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  setSearchTerm(searchTerm: string): void {
    this.searchTermSubject.next(searchTerm);
  }

  getSearchTerm(): BehaviorSubject<string> {
    return this.searchTermSubject;
  }
}
