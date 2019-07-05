import { Pipe, PipeTransform } from '@angular/core';
import { t } from '../../shared/current-lang';

/**
 * Generated class for the ShortNamePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'shortName',
})
export class ShortNamePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(user: any, ...args) {
    if (user) {
      if (user.hasOwnProperty('nickname') && user.nickname)
        return user.nickname;
      if (user.hasOwnProperty('name') && user.name) {
        var spaceIndex = user.name.indexOf(' ');
        if (spaceIndex > -1) {
          user.nickname = user.name.substring(0, spaceIndex);
          return user.nickname;
        }
        else
          return user.name;
      }
      else
        return t('shared.user.anonymous');
    } else
      return '-';
  }
}
