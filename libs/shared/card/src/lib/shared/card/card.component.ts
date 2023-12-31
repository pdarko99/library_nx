import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Book } from 'books/model';
import { BooksDataService } from 'books/data-access';

@Component({
  selector: 'lib-card',
  standalone: true,
  imports: [
    NgIf,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  protected data = inject(MAT_DIALOG_DATA);
  protected bookservice = inject(BooksDataService);

  TitleFormControl = new FormControl(this.data?.title, [Validators.required]);
  DescriptionFormControl = new FormControl(this.data?.description, [
    Validators.required,
  ]);

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
