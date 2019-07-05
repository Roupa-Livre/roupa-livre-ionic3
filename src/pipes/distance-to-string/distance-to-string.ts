import { Pipe, PipeTransform } from '@angular/core';
import { t } from '../../shared/current-lang';

/**
 * Generated class for the DistanceToStringPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'distanceToString',
})
export class DistanceToStringPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(distance: number, ...args) {
    var rounded = Math.round(distance * 10) / 10;
      if (rounded < 1) {
        if (rounded < 0.5)
          return t('shared.distance.really_close');
        else
          return t('shared.distance.close_to_prefix') + t('shared.distance.less_than_one_km') + t('shared.distance.close_to_sufix');
      }
      else
        return t('shared.distance.close_to_prefix') + rounded + t('shared.distance.close_to_sufix');
  }
}
