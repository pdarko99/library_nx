import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {DescriptionPipe} from "books/utils"
@Component({
  selector: 'lib-books',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatCardModule, MatButtonModule, MatIconModule, DescriptionPipe],
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css'],
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
