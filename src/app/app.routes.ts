import { Route } from '@angular/router';
import { BOOK_PAGE } from 'books/feature';
import { FAV_PAGE } from 'favourites';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'books',
  },
  {
    ...BOOK_PAGE,
  },
  {
    ...FAV_PAGE,
  },
];
