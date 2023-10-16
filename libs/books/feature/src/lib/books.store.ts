import { createStore, select, setProps } from '@ngneat/elf';
import { selectAllEntities, setEntities, withEntities } from '@ngneat/elf-entities';
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
