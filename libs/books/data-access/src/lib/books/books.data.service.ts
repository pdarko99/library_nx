import { Injectable, effect, signal } from '@angular/core';
import { Book } from 'books/model';

@Injectable({
  providedIn: 'root',
})
export class BooksDataService {
  favourites = signal<Book[]>([]);

  constructor() {
    effect(() => {
      console.log(this.favourites(), 'from this. fvas');
    });
  }
}
