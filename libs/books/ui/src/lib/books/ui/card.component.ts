import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Book } from 'books/model';
import { DescriptionPipe } from 'books/util';
@Component({
  selector: 'lib-books',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DescriptionPipe,
    TitleCasePipe,
  ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCardComponent {
  @Input({
    required: true,
  })
  isFavorite!: boolean;

  @Input({
    required: true,
  })
  public book!: Book;

  @Output()
  favouriteToggled = new EventEmitter<Book>();

  @Output()
  bookUpdated = new EventEmitter<Book>();
}
