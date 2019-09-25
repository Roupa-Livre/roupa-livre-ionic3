import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { BaseService } from './base-service';

@Injectable()
export class TagServiceProvider extends BaseService {
  getTag(id: number) : Promise<any> {
    return this.getOne(`global_tags/${id}`);
  }

}
