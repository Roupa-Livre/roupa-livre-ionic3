import { Pipe, PipeTransform } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { getImageAsSource, getProbableApiUrl } from '../../shared/source';

/**
 * Generated class for the UserImageSrcPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'userImageSrc',
})
export class UserImageSourcePipe implements PipeTransform {
  constructor(private tokenService: AngularTokenService) {}
  /**
   * Takes a value and makes it lowercase.
   */
  transform(user: any, ...args) {
    let result = null;
    if (user) {
      if (user.image)
        result =  getImageAsSource(this.tokenService, user.image);
      if (!result && user.social_image)
        result = getProbableApiUrl(this.tokenService, user.social_image);
    }
    return result || 'assets/img/avatar.png';
  }
}
