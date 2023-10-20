import { Route } from '@angular/router';
import { BOOK_PAGE } from 'books/feature';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'books',
  },
  {
    ...BOOK_PAGE,
  },

];
