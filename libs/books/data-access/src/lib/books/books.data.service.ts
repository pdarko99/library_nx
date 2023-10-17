import { Injectable } from '@angular/core';
import { Book } from 'books/model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksDataService {
  public getBooks(): Observable<Array<Book>> {
    return of([
      {
        id: 1,
        title: 'Book 1',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae luctus massa',
      },
      {
        id: 2,
        title: 'Book 2',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae luctus massa',
      },
      {
        id: 3,
        title: 'Book 3',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent v
          
          itae luctus massa`,
      },
      {
        id: 4,
        title: 'Book 4',
        description: 'Lorem ipsue luctus massa',
      },
      {
        id: 5,
        title: 'Book 5',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae luctus massa',
      },
    ]);
  }
}
