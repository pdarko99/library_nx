import { Component, inject,ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponent } from 'books/ui';
import { BooksDataService } from 'books/data-access';

@Component({
  selector: 'lib-favourites',
  standalone: true,
  imports: [CommonModule, UiComponent],
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class FavouritesComponent {
  bookService = inject(BooksDataService);
  favs = this.bookService.favourites

  rm_fav(book:any){
    console.log('helloefas')
    this.bookService.deletefav(book.id)
  }
}
