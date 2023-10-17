import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { Book } from 'books/model';
import { DescriptionPipe } from 'books/utils';
@Component({
  selector: 'lib-books',
  standalone: true,
  imports: [
    MatGridListModule,
    NgIf,
    NgFor,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DescriptionPipe,
  ],
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiComponent {
  @Input({
    required: true,
  })
  public books!: Array<Book>;
  @Input()
  favs = false;

  @Output()
  favourites = new EventEmitter();

  @Output()
  updatebook = new EventEmitter();
}
