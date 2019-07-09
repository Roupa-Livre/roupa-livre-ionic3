import { Pipe, PipeTransform } from '@angular/core';

export const notDestroyedFilter = (list) => list.filter(item => !item._destroy);

/**
 * Generated class for the NotDestroyedPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'notDestroyed',
})
export class NotDestroyedPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(list: any[], ...args) {
    return notDestroyedFilter(list);
  }
}
