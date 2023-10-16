import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponent } from 'books/ui';
import { Book } from 'books/model';
import { FavouritesService } from '../favourites.service';

@Component({
  selector: 'lib-favourites',
  standalone: true,
  imports: [CommonModule, UiComponent],
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FavouritesComponent {
  favouriteService = inject(FavouritesService);
  favourites = this.favouriteService.favourites;

  removeFavourite(book: Book) {
    this.favouriteService.deletefav(book.id);
  }
}
