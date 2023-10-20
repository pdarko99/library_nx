import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {DescriptionPipe} from "books/utils"
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'lib-books',
  standalone: true,
  imports: [MatGridListModule,NgIf,NgFor, MatCardModule, MatButtonModule, MatIconModule, DescriptionPipe],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiComponent {
  @Input({
    required: true,
  })
  public books:any;
  @Input()
  favs!: boolean;


  @Output()
  favourites = new EventEmitter();

  @Output()
  updatebook = new EventEmitter();

 
}
