import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ItemServiceProvider } from './item-service';
import { Apparel } from '../models/apparel';
import { ApiArray } from '../models/api-array';

const isEmptyObject = (obj) => {
  for(var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return true;
}

export class FilterApparelProperty {
  [key: string]: string;
}

export class SearchFilter {
  public range: number = 100;
  public apparel_property: FilterApparelProperty = new FilterApparelProperty;

  public hasFilters() {
    return this.range != 100 || !isEmptyObject(this.apparel_property);
  };
}

@Injectable()
export class ItemSearcherService {
  private currentApparels: Apparel[] = [];
  private filter: SearchFilter = new SearchFilter;

  constructor(private itemService: ItemServiceProvider) {

  }

  public hasFilter() {
    return this.filter && this.filter.hasFilters();
  };

  public getFilter() {
    this.filter = new SearchFilter;
  };

  public aplyFilter(filter: SearchFilter) {
    this.filter = filter;
    this.clearCache();
  };

  public clearFilter() {
    this.filter = new SearchFilter;
    this.clearCache();
  };

  private clearCache() {
    this.currentApparels = [];
  }

  private getPageSize(minCount) {
    return minCount > 6 ? minCount : 6; // TODO
    // if (window.Connection) {
    //   // console.log(navigator.connection.type);
    //   if (navigator.connection.type == Connection.ETHERNET || navigator.connection.type == Connection.WIFI)
    //     return 6;
    // }

    // return count;
  };

  async getNextItems(count: number = 3) : Promise<Apparel[]> {
    const apparels = [];
    if (this.currentApparels.length > 0) {
      while (this.currentApparels.length > 0 && apparels.length < count) {
        const apparel = this.currentApparels[0];
        this.currentApparels.splice(0, 1);
        apparels.push(apparel);
      }
    }

    if (apparels.length < count) {
      const params: any = Object.assign({}, this.filter);
      params.page_size = this.getPageSize(count);

      const items = await this.itemService.getItems(params);
      if (items && items.length > 0) {
        Array.prototype.push.apply(this.currentApparels, items);
        while (this.currentApparels.length > 0 && apparels.length < count) {
          const apparel = this.currentApparels[0];
          this.currentApparels.splice(0, 1);
          apparels.push(apparel);
        }
      }
    }
    return apparels;
  }
}
