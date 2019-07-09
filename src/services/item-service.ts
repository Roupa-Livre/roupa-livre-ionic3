import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { BaseService } from './base-service';
import { ApiArray } from '../models/api-array';
import { Apparel } from '../models/apparel';
import { ApparelRating } from '../models/apparel_rating';

@Injectable()
export class ItemServiceProvider extends BaseService {
  // METHODS
	getItems(params = {}) : Promise<ApiArray<Apparel>>{
    var mergedParams: any = Object.assign({}, params)
    if (mergedParams.range && mergedParams.range >= 100)
      delete mergedParams["range"];

    return this.getMany<Apparel>('apparels', mergedParams);
  }

  getOwned(params = {}) : Promise<ApiArray<Apparel>>{
    var mergedParams: any = Object.assign({}, params)
    if (mergedParams.range && mergedParams.range >= 100)
      delete mergedParams["range"];
      mergedParams

    return this.getMany<Apparel>('apparels/owned', mergedParams);
  }

  rate(apparel: Apparel, liked: boolean) {
    const apparel_rating = new ApparelRating();
    apparel_rating.apparel_id = apparel.id;
    apparel_rating.liked = liked;

    return this.post('apparel_ratings', { apparel_rating });
  }

}
