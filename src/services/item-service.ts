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

    return this.getMany<Apparel>('apparels/owned', mergedParams);
  }

  getMatched(params = {}) : Promise<ApiArray<Apparel>>{
    return this.getMany<Apparel>('apparels/matched', params);
  }

  save(item) {
    const data = { apparel: Object.assign({}, item) }
    data.apparel.apparel_property_attributes = item.apparel_property;
    data.apparel.apparel_images_attributes = item.apparel_images;
    data.apparel.apparel_tags_attributes = item.apparel_tags;

    if (item.id > 0) {
      return this.put(`apparels/${item.id}`, data);
    } else {
      return this.post('apparels', data);
    }
  }

  rate(apparel: Apparel, liked: boolean) {
    const apparel_rating = new ApparelRating();
    apparel_rating.apparel_id = apparel.id;
    apparel_rating.liked = liked;

    return this.post('apparel_ratings', { apparel_rating });
  }

  findApparelsByUser(user_id) : Promise<ApiArray<Apparel>>{
    return this.getMany<Apparel>(`/apparels/apparels_by_user/${user_id}`);
    
  }

}
