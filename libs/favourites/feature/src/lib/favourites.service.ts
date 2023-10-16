import { Injectable, inject } from '@angular/core';
import { BooksDataService } from 'books/data-access';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  bookService = inject(BooksDataService);
  favourites = this.bookService.favourites

  deletefav(id?: number) {
    const updatedBooks = this.favourites().filter((book) => book.id !== id);

    this.favourites.set(updatedBooks);

  }
}
