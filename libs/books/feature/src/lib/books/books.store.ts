import { createStore, select, setProps, withProps } from '@ngneat/elf';
import {
  selectAllEntities,
  setEntities,
  withEntities,
} from '@ngneat/elf-entities';
import { Book } from 'books/model';
import {
  withRequestsCache,
  withRequestsStatus,
  createRequestDataSource,
} from '@ngneat/elf-requests';

import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';

const bookStore = createStore(
  {
    name: 'BookStoreName',
  },
  withEntities<Book>(),
  withProps<{ favourites: Array<Book['id']> }>({ favourites: [] }),
  withRequestsCache(),
  withRequestsStatus()
);

persistState(bookStore, {
  key: 'bookStore',
  storage: localStorageStrategy,
});

const bookDataSource = createRequestDataSource({
  data$: () => bookStore.pipe(selectAllEntities()),
  dataKey: 'books',
  idleAsPending: true,
  requestKey: 'books',
  store: bookStore,
});

export function setBooks(book: Book[]) {
  bookStore.update(
    setEntities(book),
    bookDataSource.setSuccess(),
    bookDataSource.setCached()
  );
}

export function setFavorites(favourite_ids: Array<Book['id']>) {
  bookStore.update(
    setProps({
      favourites: favourite_ids,
    })
  );
}

export const getFavorites = bookStore.pipe(select((state) => state.favourites));

export const selectbookDataSource$ = bookDataSource.data$();

/*
import { createStore, select, setProps, withProps } from '@ngneat/elf';
import {
  getAllEntities,
  selectAllEntities,
  setEntities,
  withEntities,
} from '@ngneat/elf-entities';
import {
  createRequestDataSource,
  withRequestsCache,
  withRequestsStatus,
} from '@ngneat/elf-requests';
import { Book } from 'books/model';

import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';

const bookStore = createStore(
  {
    name: 'BookStoreName',
  },
  withEntities<Book>(),
  withProps<{
    favorites: Array<Book['id']>;
  }>({
    favorites: [],
  }),
  withRequestsCache(),
  withRequestsStatus()
);

persistState(bookStore, {
  key: 'bookStore',
  storage: localStorageStrategy,
});

const bookDataSource = createRequestDataSource({
  data$: () => bookStore.pipe(selectAllEntities()),
  dataKey: 'books',
  idleAsPending: true,
  requestKey: 'books',
  store: bookStore,
});

export function setBooks(book: Book[]) {
  bookStore.update(
    setEntities(book),
    bookDataSource.setSuccess(),
    bookDataSource.setCached()
  );
}

export const selectbookDataSource$ = bookDataSource.data$();

export function setFavorites(bookIds: Array<Book['id']>) {
  bookStore.update(
    setProps({
      favorites: bookIds,
    })
  );
}

export function getBooks() {
  return bookStore.query(getAllEntities());
}

export function getFavorites() {
  return bookStore.query((state) => state.favorites);
}

export const selectFavorites$ = bookStore.pipe(
  select((state) => state.favorites)
);

*/
