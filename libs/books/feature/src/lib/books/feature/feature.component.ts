import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {UiComponent} from "books/ui"
import {BooksDataService} from "books/data-access"
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {CardComponent} from "shared/card"
import {Book} from "books/model"

@Component({
  selector: 'lib-feature',
  standalone: true,
  imports: [CommonModule, UiComponent,MatDialogModule],
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css'],
})
export default class FeatureComponent {
  private booksService = inject(BooksDataService)
  public dialog = inject(MatDialog)

  books = this.booksService.books()

  favourites(book:Book){
    const res = this.booksService.addfav(book)
    if(res){
     return alert("added to favourites")
    }
    alert("already added to favourites")
  }

  updatebook(book: Book){
    this.openDialog(book)
  }

  openDialog(book?:Book) {
    const dialogRef = this.dialog.open(CardComponent, {data:book});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
