import { Injectable, signal, effect } from '@angular/core';
import {Book} from "books/model"

@Injectable({
  providedIn: 'root',
})
export class BooksDataService {
  favs = signal<Book[]>([]);
  books = signal<Book[]>([
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
      description:
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent v
        
        itae luctus massa`,
    },
    {
      id: 4,
      title: 'Book 4',
      description:
        'Lorem ipsue luctus massa',
    },
    {
      id: 5,
      title: 'Book 5',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae luctus massa',
    },
  ]);

  constructor() {
    effect(() => {
      console.log('books Todos:');
      console.log(this.books());
    });
  }

  addBook(data: Book) {
    data.id = this.books().length + 1;
    this.books.mutate((book) => book.push(data));
  }

  updateBook(data: Book) {
    console.log('um updating..', data);

    this.books.mutate((value) => {
      const index = value.findIndex((book: Book) => book.id === data.id);
      console.log(index, 'from index');
      value[index].title = data.title;
      value[index].description = data.description;
    });
  }

  deleteBook(id: number){
    this.books.mutate((value) => {
      const index = value.findIndex((book: Book) => book.id === id);
      value.splice(index, 1)
    })
  }

  addfav(data: Book): number {
    let res = 0

    this.favs.mutate((value) => {
      const index = value.findIndex((book: Book) => book.id === data.id);
      if(index === -1){
        value.push(data)
        res = 1
      } 
    })
    return res

  }

  deletefav(id: number){
    this.favs.mutate((value) => {
      const index = value.findIndex((book: Book) => book.id === id);
      value.splice(index, 1)
    })
  }
}
