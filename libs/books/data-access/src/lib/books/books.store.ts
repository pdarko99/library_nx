import { createStore, withProps, select, setProps } from '@ngneat/elf';
import { Book } from 'books/model';
import {
  withRequestsCache,
  withRequestsStatus,
  createRequestDataSource,
} from '@ngneat/elf-requests';

import {
  excludeKeys,
  localStorageStrategy,
  persistState,
} from '@ngneat/elf-persist-state';

interface BooksProps {
  books: Book[];
}
const bookStore = createStore(
  {
    name: 'BookStoreName',
  },
  withProps<BooksProps>({
    books: [],
  }),
  withRequestsCache(),
  withRequestsStatus()
);

persistState(bookStore, {
  key: 'bookStore',
  storage: localStorageStrategy,
});

const bookDataSource = createRequestDataSource({
  data$: () => bookStore.pipe(select((state) => state.books)),
  dataKey: 'books',
  idleAsPending: true,
  requestKey: 'books',
  store: bookStore,
});

export function setBooks(book: Book[]) {
  bookStore.update(
    setProps({
      books: book,
    }),
    bookDataSource.setSuccess(),
    bookDataSource.setCached()
  );
}

export const selectbookDataSource$ = bookDataSource.data$();
