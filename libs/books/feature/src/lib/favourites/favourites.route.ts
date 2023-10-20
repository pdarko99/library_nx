import { Route } from '@angular/router';

export const FAVOURITE_PAGE: Route = {
  path: 'favs',
  loadComponent: () => import('./favourites.component')
};
