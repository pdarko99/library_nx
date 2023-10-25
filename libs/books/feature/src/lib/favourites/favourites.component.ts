import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Book } from 'books/model';
import { BookCardComponent } from 'books/ui';
import { BooksService } from '../books/books.service';

@Component({
  selector: 'lib-favourites',
  standalone: true,
  imports: [BookCardComponent, NgFor],
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FavouritesComponent {
  booksService = inject(BooksService);
  favourites = toSignal(this.booksService.getFavouriteBooks$, {
    initialValue: [] as Book[],
  });

  removeFavourite(book: Book) {
    this.booksService.deletefavourite(book.id);
  }
}
