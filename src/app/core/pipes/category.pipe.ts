import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'category' })

export class CategoryPipe implements PipeTransform {
  transform(input: string | undefined): string {
    if(!input) {
      return '';
    }
    const i = input.split(',');
    i.splice(0, 1);
    i.splice(i.length - 1, 1);
    return i.join(' / ');
  }
}
