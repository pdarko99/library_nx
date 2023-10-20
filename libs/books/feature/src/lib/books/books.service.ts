import { Injectable, Injector, inject, signal } from '@angular/core';
import { Book } from 'books/model';
import { Observable, filter, map, switchMap, tap } from 'rxjs';
import {
  selectbookDataSource$,
  setBooks,
  getBooks,
  selectFavorites$,
  getFavourites,
  setFavorites,
} from './books.store';
import { BooksDataService } from 'books/data-access';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  protected readonly injector = inject(Injector);

  bookService = inject(BooksDataService);

  // favourites = selectFavorites$;

  all_books = selectbookDataSource$.pipe(
    filter((data) => !data.loading),
    tap((data) => console.log(data, 'from slect all entites')),
    map((data) => data.books)
  );

  loadBooks() {
    return this.bookService.books().pipe(tap((books) => setBooks(books)));
  }

  addBook(data: Book) {
    data.id = getBooks().length + 1;
    const books = [data, ...getBooks()];
    setBooks(books);
  }

  updateBook(data: Book) {
    const newBook = {
      ...data,
      title: data.title,
      description: data.description,
    };

    const updatedBooks = getBooks().map((todo) =>
      todo.id === data.id ? newBook : todo
    );

    console.log(updatedBooks);

    setBooks(updatedBooks);
  }

  deleteBook(id: number) {
    const updatedBooks = getBooks().filter((book) => book.id !== id);

    setBooks(updatedBooks);
  }


  getFavourites(): Observable<Array<Book>> {
    selectFavorites$.pipe(
      switchMap(favourites => {
        return this.all_books.pipe(
          map(books => books.filter(book => favourites.includes(book.id)))
        )
      })
    )
  }

  addfav(data: Book): number {
    let results = 0;

    const index = getFavourites().findIndex((i) => i === data.id);

    if (index === -1) {
      setFavorites([...getFavourites(), data.id]);
      results = 1;
    }

    return results;
  }

  deletefav(Favourite_id?: number) {
    const updatedBooks = getFavourites().filter((id) => id !== Favourite_id);
    setFavorites(updatedBooks);
  }
}
