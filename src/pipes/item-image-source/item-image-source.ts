import { Pipe, PipeTransform } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { getImageAsSource } from '../../shared/source';

/**
 * Generated class for the ItemImageSourcePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'itemImageSrc',
})
export class ItemImageSourcePipe implements PipeTransform {
  constructor(private tokenService: AngularTokenService) {}

  transform(image: any, ...args) {
    return getImageAsSource(this.tokenService, image);
  }
}
