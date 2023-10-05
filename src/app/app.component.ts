import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {SharedUiComponent} from "shared-ui"
import {MatSidenavModule} from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { distinctUntilChanged, map } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [ RouterModule, NgIf, SharedUiComponent, MatToolbarModule,MatIconModule,MatSidenavModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  breakpoint!:boolean;
  title = 'library';

  breakpointObserver = inject(BreakpointObserver)


  ngOnInit() {
    this.breakpointObserver
    .observe('(min-width: 600px)')
    .pipe(
      map(value => value.matches),
      distinctUntilChanged()
    ).subscribe(
      value => {
        console.log(value)
        this.breakpoint = value
      }
    )
  }
}
