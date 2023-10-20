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
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  protected data = inject(MAT_DIALOG_DATA);
  protected bookservice = inject(BooksDataService);

  TitleFormControl = new FormControl(this.data.book?.title, [Validators.required]);
  DescriptionFormControl = new FormControl(this.data.book?.description, [
    Validators.required,
  ]);

  Add_or_update_Book() {
    const data: Book = {
      id: 0,
      title: this.TitleFormControl.value,
      description: this.DescriptionFormControl.value,
    };
    
    if (this.data.book) {
      console.log(data)
      data.id = this.data.book.id;
      return this.data.funcs.updateBook(data);
    }
    this.data.funcs.addBook(data);
  }

  deleteBook() {
    this.data.funcs.deletebook(this.data.book.id);
  }
}
