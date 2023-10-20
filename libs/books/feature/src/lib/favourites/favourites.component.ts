import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponent } from 'books/ui';
import { Book } from 'books/model';
import { BooksService } from '../books/books.service';
import { toSignal } from '@angular/core/rxjs-interop';

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
  favourites = toSignal(this.booksService.getFavourites);

 

  removeFavourite(book: Book) {
    this.booksService.deletefav(book.id);
  }
}
