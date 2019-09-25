import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ItemServiceProvider } from './item-service';
import { Apparel } from '../models/apparel';
import { ApiArray } from '../models/api-array';

const isEmptyObject = (obj) => {
  for(var prop in obj) {
    if (obj[prop]) {
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
  public show_only_liked: boolean = false;
  public show_only_likers: boolean = false;
  public show_not_liked_again: boolean = false;
  public show_liked_again: boolean = false;

  public apparel_property: FilterApparelProperty = new FilterApparelProperty;
  public apparel_tags: string[] = [];

  public apparel_property_names: { [key: string]: string } = {};
  public group_props: string[] = [];

  public hasFilters() {
    return this.range != 100 || !isEmptyObject(this.apparel_property)
      || this.show_only_liked
      || this.show_only_likers
      || this.show_not_liked_again
      || this.show_liked_again;
  };
}

@Injectable()
export class ItemSearcherService {
  private currentApparels: Apparel[] = [];
  private alreadySeen: Apparel[] = [];
  private filter: SearchFilter = new SearchFilter;

  constructor(private itemService: ItemServiceProvider) {

  }

  public hasFilter() {
    return this.filter && this.filter.hasFilters();
  };

  public getFilterClone() {
    const filter = new SearchFilter();
    Object.assign(filter, this.filter);

    filter.apparel_property = {  };
    Object.assign(filter.apparel_property, this.filter.apparel_property);

    filter.apparel_property_names = {  };
    Object.assign(filter.apparel_property_names, this.filter.apparel_property_names);

    filter.group_props = [];
    Object.assign(filter.group_props, this.filter.group_props);

    filter.apparel_tags = [];
    Object.assign(filter.apparel_tags, this.filter.apparel_tags);

    return filter;
  };

  public getSearchName() {
    const filter = this.filter;
    return filter.group_props.map(propName => filter.apparel_property_names[propName]).join(' ');
  }

  public applyFilter(filter: SearchFilter) {
    this.filter = filter;
    this.clearCache();
  };

  public clearFilter() {
    this.filter = new SearchFilter;
    this.clearCache();
    return this.filter;
  };

  private clearCache() {
    this.currentApparels = [];
    this.alreadySeen = [];
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

  public addToAlreadySeen(apparel) {
    this.alreadySeen.push(apparel);
  }

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
      params.already_seen_ids = this.alreadySeen.map(apparel => apparel.id.toString()).join(',');

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
