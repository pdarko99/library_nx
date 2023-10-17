import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  inject,
} from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Book } from 'books/model';
import { UiComponent } from 'books/ui';
import { CardComponent } from 'shared/card';
import { BooksService } from '../../feature.service';

// interface BookService {

@Component({
  selector: 'lib-feature',
  standalone: true,
  imports: [UiComponent, MatDialogModule],
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FeatureComponent implements OnInit {
  protected readonly injector = inject(Injector);

  protected featureService = inject(BooksService);

  protected readonly books = toSignal(this.featureService.selectBooks$, {
    initialValue: [],
  });

  ngOnInit(): void {
    this.featureService.loadBooks().subscribe();
  }

  favourites(book: Book) {
    this.featureService.addFavourite(book.id);
  }

  updatebook(book: Book) {
    this.openDialog(book);
  }

  openDialog(book?: Book) {
    const dialogRef = this.injector.get(MatDialog).open(CardComponent, {
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
    this.featureService.deleteBook(id);
  }

  addBook(book: Book) {
    this.featureService.addBook(book);
  }

  updateBook(book: Book) {
    this.featureService.updateBook(book);
  }
}
