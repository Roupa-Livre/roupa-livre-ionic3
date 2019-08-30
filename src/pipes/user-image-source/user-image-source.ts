import { Pipe, PipeTransform } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { getImageAsSource } from '../../shared/source';

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
  transform(image: any, socialImage: any, ...args) {
    return getImageAsSource(this.tokenService, image) ||
      getImageAsSource(this.tokenService, socialImage) ||
      'assets/img/avatar.png';
  }
}
