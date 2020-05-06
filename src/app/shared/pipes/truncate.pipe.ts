import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(str: string, visibleChars: number): string {
    return str.slice(0, visibleChars).concat('...');
  }

}
