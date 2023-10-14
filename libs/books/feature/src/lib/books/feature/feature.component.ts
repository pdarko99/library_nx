import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  inject,
} from '@angular/core';

import { UiComponent } from 'books/ui';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CardComponent } from 'shared/card';
import { Book } from 'books/model';
import { FeatureService } from '../../feature.service';

@Component({
  selector: 'lib-feature',
  standalone: true,
  imports: [UiComponent, MatDialogModule],
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FeatureComponent implements OnInit{

  protected readonly injector = inject(Injector);


  protected featureService = inject(FeatureService);
  storyBooks = this.featureService.storyBooks;

  ngOnInit(): void {
    this.featureService.setBooksService()
  }

  favourites(book: Book) {
    const results = this.featureService.addfav(book);
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
