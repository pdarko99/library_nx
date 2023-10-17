import { Injectable, inject } from '@angular/core';
import { BooksDataService } from 'books/data-access';
import { Book } from 'books/model';
import { filter, map, switchMap, tap } from 'rxjs';
import {
  getBooks,
  getFavorites,
  selectFavorites$,
  selectbookDataSource$,
  setBooks,
  setFavorites,
} from './books.store';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  protected readonly booksData = inject(BooksDataService);

  public readonly selectBooks$ = selectbookDataSource$.pipe(
    filter((data) => !data.loading),
    map((data) => data.books)
  );

  public get books() {
    return getBooks();
  }

  public selectFavourites$ = selectFavorites$;

  public selectFavouriteBooks$ = this.selectFavourites$.pipe(
    switchMap((favourites) =>
      this.selectBooks$.pipe(
        map((books) => books.filter((book) => favourites.includes(book.id)))
      )
    )
  );

  loadBooks() {
    return this.booksData.getBooks().pipe(tap((books) => setBooks(books)));
  }

  addBook(book: Book) {
    const books = this.books;

    const newBookId =
      Math.max(...books.map((existingBooks) => existingBooks.id)) + 1;

    const newBook: Book = {
      ...book,
      id: newBookId,
    };

    setBooks([...books, newBook]);
  }

  updateBook(data: Book) {
    console.log('firn in service okay');
    const newBook = {
      ...data,
      title: data.title,
      description: data.description,
    };

    const updatedBooks = this.books.map((todo) =>
      todo.id === data.id ? newBook : todo
    );

    console.log(updatedBooks);

    setBooks(updatedBooks);
  }

  deleteBook(id: number) {
    const updatedBooks = this.books.filter((book) => book.id !== id);

    setBooks(updatedBooks);
  }

  get favourites() {
    return getFavorites();
  }

  addFavourite(bookId: Book['id']) {
    const favoriteBooks = this.favourites;

    setFavorites(Array.from(new Set([...favoriteBooks, bookId])));
  }

  deleteFavourite(bookId: number) {
    const favoriteBooks = this.favourites;

    const updatedBooks = favoriteBooks.filter(
      (favouriteBookId) => favouriteBookId !== bookId
    );

    setFavorites(updatedBooks);
  }
}
