import { Route } from '@angular/router';

export const FAV_PAGE: Route = {
  path: 'favs',
  loadComponent: () => import('./favourites.component')
};
