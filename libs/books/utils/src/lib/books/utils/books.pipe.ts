import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flatten_description',
  standalone: true,
})
export class DescriptionPipe implements PipeTransform {
  transform(value: string) {
    value.length < 80 ? value  : value = value.substring(0, 84) + "...";
    return value;
  }
}
