import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  inject,
} from '@angular/core';

import { CardComponent } from 'books/ui';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from "shared/dialog"
import { Book } from 'books/model';
import { BooksService } from './books.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'lib-feature',
  standalone: true,
  imports: [CardComponent, MatDialogModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BooksComponent implements OnInit {
  protected readonly injector = inject(Injector);

  protected booksService = inject(BooksService);
  all_books = toSignal(this.booksService.all_books$, {
    initialValue: [] as Book[],
  });

  ngOnInit(): void {
    this.booksService.loadBooks().subscribe();
  }

  favourites(book: Book) {
    const results = this.booksService.addfav(book);
    if (results) {
      return alert('added to favourites');
    }
    alert('already added to favourites');
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
