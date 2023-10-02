import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'lib-shared-ui',
  standalone: true,
  imports: [CommonModule, MatToolbarModule,MatIconModule],
  templateUrl: './shared-ui.component.html',
  styleUrls: ['./shared-ui.component.css'],
})
export class SharedUiComponent {}
