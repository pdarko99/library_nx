import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  inject,
} from '@angular/core';

import { NgFor } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Book } from 'books/model';
import { BookCardComponent } from 'books/ui';
import { DialogComponent } from 'shared/dialog';
import { BooksService } from './books.service';

@Component({
  selector: 'lib-feature',
  standalone: true,
  imports: [BookCardComponent, MatDialogModule, NgFor],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BooksComponent implements OnInit {
  protected readonly injector = inject(Injector);

  protected booksService = inject(BooksService);
  allBooks = toSignal(this.booksService.all_books$, {
    initialValue: [] as Book[],
  });

  favourites = toSignal(this.booksService.selectFavourites$, {
    initialValue: [] as Book['id'][],
  });

  ngOnInit(): void {
    this.booksService.fetchBooks().subscribe();
  }

  toggleFavourite(book: Book) {
    this.booksService.toggleFavourite(book.id);
  }

  updatebook(book: Book) {
    this.openDialog(book);
  }

  openDialog(book?: Book) {
    const dialogRef = this.injector.get(MatDialog).open(DialogComponent, {
      data: {
        book,
        funcs: {
          deletebook: this.deleteBook.bind(this),
          addBook: this.addBook.bind(this),
          updateBook: this.updateBook.bind(this),
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteBook(id: number) {
    this.booksService.deleteBook(id);
  }

  addBook(book: Book) {
    this.booksService.addBook(book);
  }

  updateBook(book: Book) {
    this.booksService.updateBook(book);
  }
}
