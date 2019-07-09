import { Pipe, PipeTransform } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { getImageAsSource } from '../../shared/source';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the ItemImageSourcePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'itemImageBgSrc',
})
export class ItemImageBgSourcePipe implements PipeTransform {
  constructor(private tokenService: AngularTokenService, private sanitizer: DomSanitizer) {}

  transform(image: any, ...args) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${getImageAsSource(this.tokenService, image)})`);
  }
}
