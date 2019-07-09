import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { BaseService } from './base-service';
import { ApiArray } from '../models/api-array';
import { Apparel } from '../models/apparel';
import { ApparelRating } from '../models/apparel_rating';

@Injectable()
export class PropertyGroupService extends BaseService {
  // METHODS
	root() {
    return this.getMany('property_groups', { root: true });
  }

  children(parentId, propertyId) {
    return this.getMany('property_groups', { parent_id: parentId, property_id: propertyId });
  }

}
