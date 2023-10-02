import { Route } from '@angular/router';

export const BOOK_PAGE: Route = {
  path: 'books',
  loadComponent: () => import('./feature.component')
};
