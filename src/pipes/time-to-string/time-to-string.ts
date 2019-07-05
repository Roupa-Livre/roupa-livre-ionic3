import moment from 'moment';

import { Pipe, PipeTransform } from '@angular/core';
import { t } from '../../shared/current-lang';

/**
 * Generated class for the TimeToStringPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'timeToString',
})
export class TimeToStringPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(time: any, ...args) {
    var timeMoment = moment(time);
    var nowMoment = moment();
    // var nowDate = timeToDate(now);
    // var timeDate = timeToDate(time);
    var days = 24 * 3600 * 1000;
    var diff = nowMoment.diff(timeMoment);
    var diffInDays = diff / days;
    // var diffInHours = diffInDays / 24;
    if (diffInDays > 1) {
      if (diffInDays < 2 && nowMoment.date() == (timeMoment.date() - 1))
        return t('shared.datetime.yesterday');
      else {
        return Math.floor(diffInDays) + ' ' + t('shared.datetime.since_days');
      }
    } else {
      if (nowMoment.date() == timeMoment.date())
        return timeMoment.format('h:mm')
      else
        return t('shared.datetime.yesterday');
    }
  }
}
