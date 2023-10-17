import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BooksService } from 'books/feature';
import { Book } from 'books/model';
import { UiComponent } from 'books/ui';

@Component({
  selector: 'lib-favourites',
  standalone: true,
  imports: [CommonModule, UiComponent],
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FavouritesComponent {
  booksService = inject(BooksService);
  favouriteBooks = toSignal(this.booksService.selectFavouriteBooks$, {
    initialValue: [],
  });

  removeFavourite(book: Book) {
    this.booksService.deleteFavourite(book.id);
  }
}
