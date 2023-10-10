import { Injectable, effect, signal } from '@angular/core';
import { Book } from 'books/model';
import { selectbookDataSource$, setBooks } from './books.store';
import { filter, map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class BooksDataService {
  public readonly selectBooks$ = selectbookDataSource$.pipe(
    filter((data) => !data.loading),
    map((data) => data.books)
  );

  storyBooks = signal<Book[]>([]);

  private readonlystoryBooks = toSignal(
    this.selectBooks$.pipe(tap((x) => this.storyBooks.set(x))),
    { initialValue: [] as Book[] }
  );

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

  constructor() {
    setBooks(this.books);

    effect(() => {
      console.log(this.favourites(), 'from this. fvas');
    });
  }

  addBook(data: Book) {
    data.id = this.storyBooks().length + 1;
    this.storyBooks.set([...this.storyBooks(), data]);
    setBooks(this.storyBooks());
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

    this.storyBooks.set(updatedBooks);

    setBooks(this.storyBooks());
  }

  deleteBook(id: number) {
    const updatedBooks = this.storyBooks().filter((book) => book.id !== id);

    this.storyBooks.set(updatedBooks);

    setBooks(this.storyBooks());
  }

  addfav(data: Book): number {
    let results = 0;

    const index = this.favourites().findIndex((i) => i.id === data.id);

    if (index === -1) {
      this.favourites.set([...this.favourites(), data]);
      results = 1;
    }

    return results;
  }

  deletefav(id: number) {
    const updatedBooks = this.favourites().filter((book) => book.id !== id);

    this.favourites.set(updatedBooks);
  }
}
