import { Injectable, inject } from '@angular/core';
import { BooksDataService } from 'books/data-access';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  bookService = inject(BooksDataService);
  favourites = this.bookService.favourites

  deletefav(id?: number) {
    console.log(this.favourites(), 'before are you being called');
    const updatedBooks = this.favourites().filter((book) => book.id !== id);

    this.favourites.set(updatedBooks);

    console.log(this.favourites(), 'after are you being called');
  }
}
