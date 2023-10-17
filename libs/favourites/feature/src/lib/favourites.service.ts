import { Injectable, inject } from '@angular/core';
import { BooksDataService } from 'books/data-access';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  bookService = inject(BooksDataService);
}
