import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  inject,
} from '@angular/core';

import { UiComponent } from 'books/ui';
import { BooksDataService } from 'books/data-access';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CardComponent } from 'shared/card';
import { Book } from 'books/model';

@Component({
  selector: 'lib-feature',
  standalone: true,
  imports: [UiComponent, MatDialogModule],
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FeatureComponent {

  protected readonly injector = inject(Injector);


  protected bookservice = inject(BooksDataService);
  storyBooks = this.bookservice.storyBooks;

  favourites(book: Book) {
    const results = this.bookservice.addfav(book);
    if (results) {
      return alert('added to favourites');
    }
    alert('already added to favourites');
  }

  updatebook(book: Book) {
    this.openDialog(book);
  }

  openDialog(book?: Book) {
    const dialogRef = this.injector
      .get(MatDialog)
      .open(CardComponent, { data: book });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
