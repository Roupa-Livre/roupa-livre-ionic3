import { Pipe, PipeTransform } from '@angular/core';
import { t } from '../../shared/current-lang';

/**
 * Generated class for the UserImageSrcPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(key) {
    return t(key);
  }
}
