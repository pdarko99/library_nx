import { Injectable, Injector, inject } from '@angular/core';
import { Book } from 'books/model';
import { filter, map, switchMap, tap } from 'rxjs';
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

  all_books$ = selectbookDataSource$.pipe(
    filter((data) => !data.loading),
    tap((data) => console.log(data, 'from slect all entites')),
    map((data) => data.books)
  );

  loadBooks() {
    return this.bookService.books().pipe(tap((books) => setBooks(books)));
  }

  addBook(book: Book) {
    const insertedBook = { ...book };
    insertedBook.id = Math.max(...getBooks().map((i) => i.id)) + 1;
    const books = [insertedBook, ...getBooks()];
    setBooks(books);
  }

  updateBook(book_to_be_updated: Book) {
    const newBook = {
      ...book_to_be_updated,
      title: book_to_be_updated.title,
      description: book_to_be_updated.description,
    };

    const updatedBooks = getBooks().map((book) =>
      book.id === book_to_be_updated.id ? newBook : book_to_be_updated
    );

    setBooks(updatedBooks);
  }

  deleteBook(id: number) {
    const updatedBooks = getBooks().filter((book) => book.id !== id);

    setBooks(updatedBooks);
  }

  public getFavouriteBooks$ = selectFavorites$.pipe(
    switchMap((favourites) =>
      this.all_books$.pipe(
        map((books) => books.filter((book) => favourites.includes(book.id)))
      )
    )
  );

  addfavourite(favouriteBook_id: number) {
    const favoriteBooks = getFavourites();

    favoriteBooks.includes(favouriteBook_id)
      ? this.deletefavourite(favouriteBook_id)
      : setFavorites(Array.from(new Set([...favoriteBooks, favouriteBook_id])));
  }

  deletefavourite(Favourite_id?: number) {
    const updatedBooks = getFavourites().filter((id) => id !== Favourite_id);
    setFavorites(updatedBooks);
  }
}
