import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponent } from 'books/ui';
import { Book } from 'books/model';
import { BooksService } from '../books/books.service';

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
  favourites = this.booksService.favourites;

  removeFavourite(book: Book) {
    this.booksService.deletefav(book.id);
  }
}
