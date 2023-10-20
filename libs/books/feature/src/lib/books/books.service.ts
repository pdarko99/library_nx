import { Injectable, Injector, inject, signal } from '@angular/core';
import { Book } from 'books/model';
import { filter, map } from 'rxjs';
import { selectbookDataSource$, setBooks } from './books.store';
import { toSignal } from '@angular/core/rxjs-interop';
import { BooksDataService } from 'books/data-access';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  protected readonly injector = inject(Injector);
  bookService = inject(BooksDataService);

  favourites = signal<Book[]>([]);

  books = [
    {
      id: 1,
      title: 'Book 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae luctus massa',
    },
    {
      id: 2,
      title: 'Book 2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae luctus massa',
    },
    {
      id: 3,
      title: 'Book 3',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent v
        
        itae luctus massa`,
    },
    {
      id: 4,
      title: 'Book 4',
      description: 'Lorem ipsue luctus massa',
    },
    {
      id: 5,
      title: 'Book 5',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae luctus massa',
    },
  ];

  

  all_books = selectbookDataSource$.pipe(
    filter((data) => !data.loading),
    map((data) => data.books)
  );

  setBooksService() {
    setBooks(this.books);
  }

  addBook(data: Book) {
    data.id = this.storyBooks().length + 1;
    const books = [data, ...this.storyBooks()];
    setBooks(books);
  }

  updateBook(data: Book) {
    const newBook = {
      ...data,
      title: data.title,
      description: data.description,
    };

    const updatedBooks = this.storyBooks().map((todo) =>
      todo.id === data.id ? newBook : todo
    );

    console.log(updatedBooks);

    setBooks(updatedBooks);
  }

  deleteBook(id: number) {
    const updatedBooks = this.storyBooks().filter((book) => book.id !== id);

    setBooks(updatedBooks);
  }

  addfav(data: Book): number {
    if (!this.favourites().length) {
      const bookDataService = this.injector.get(BooksDataService);

      this.favourites = bookDataService.favourites;
    }
    let results = 0;

    const index = this.favourites().findIndex((i) => i.id === data.id);

    if (index === -1) {
      this.favourites.set([...this.favourites(), data]);
      results = 1;
    }

    return results;
  }

  deletefav(id?: number) {
    const updatedBooks = this.favourites().filter((book) => book.id !== id);

    this.favourites.set(updatedBooks);
  }
}
