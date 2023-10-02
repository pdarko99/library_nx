import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { BooksDataService } from 'books/data-access';
import { Book } from 'books/model';

@Component({
  selector: 'lib-card',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  TitleFormControl = new FormControl(this.data?.title, [Validators.required]);
  DescriptionFormControl = new FormControl(this.data?.description, [
    Validators.required,
  ]);

  bookservice = inject(BooksDataService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  Add_or_update_Book() {
    const data: Book = {
      title: this.TitleFormControl.value,
      description: this.DescriptionFormControl.value,
    };
    if (this.data) {
      data.id = this.data.id;
      return this.bookservice.updateBook(data);
    }

    this.bookservice.addBook(data);
  }

  deleteBook() {
    this.bookservice.deleteBook(this.data.id);
  }
}
