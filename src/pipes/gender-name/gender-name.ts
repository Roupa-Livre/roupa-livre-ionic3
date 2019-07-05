import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the GenderNamePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'genderName',
})
export class GenderNamePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(gender: string, ...args) {
    if (gender == "FEM" || gender == "MASC")
      return gender;
    else
      return null;
  }
}
