import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the AgeInfoNamePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'ageInfoName',
})
export class AgeInfoNamePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value.toLowerCase();
  }
}
