import { Pipe, PipeTransform } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { selectFavorites$ } from 'books/feature';

@Pipe({
  name: 'isFavourite',
  standalone: true,
})
export class IsFavouritePipe implements PipeTransform {

  favouritesList = toSignal(selectFavorites$, {initialValue: [] as number[]})


  transform(value: number): string {

    return this.favouritesList().includes(value) ?  "remove fav" : "add fav"
  }
}
