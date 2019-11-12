import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ItemSearcherService, SearchFilter } from '../../services/item-searcher-service';
import { PropertyGroupService } from '../../services/property-group-service';
import { AnalyticsService } from '../../services/analytics-service';

@IonicPage()
@Component({
	selector: 'page-item-search',
	templateUrl: 'item-search.html',
})
export class ItemSearchPage {

  // VARS
  public filter: SearchFilter;
  public propertyGroups = [];

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
    public navParams: NavParams,
    private itemSearcherService: ItemSearcherService,
    private propertyGroupService: PropertyGroupService,
    private viewCtrl: ViewController,
    private analyticsService: AnalyticsService
	) {
    this.filter = this.itemSearcherService.getFilterClone();
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
    this.loadFilter();
  }

  ionViewDidEnter() {
    this.analyticsService.trackPage('item-search');
  }

  async loadFilter() {
    const filter = this.itemSearcherService.getFilterClone();
    await this.reloadPropertyGroups(filter);
    this.filter = filter;
  }

  reloadPropertyGroups(item) {
    const propertyGroups = [];
    this.loadRootGroups(propertyGroups, item);

    this.propertyGroups = propertyGroups.sort((a, b) => a.sort_order - b.sort_order);
  }

  public async loadRootGroups(propertyGroups, entry) {
    const groups = await this.propertyGroupService.root();
    return await groups.map(async (group) => await this.doAddPropertyGroup(propertyGroups, group, null, entry));
  }

  public async groupPropertySelectionChanged(group) {
    const newValue = this.filter.apparel_property[group.prop_name];
    const propertyGroups = this.propertyGroups.slice(0);
    await this.doGroupPropertySelectionChanged(propertyGroups, group, newValue, this.filter);

    this.propertyGroups = propertyGroups.sort((a, b) => a.sort_order - b.sort_order);
    this.updateFilterNames();
  }

  updateFilterNames() {
    const names =  {};
    const group_props = [];
    for (const group of this.propertyGroups) {
      const propertyId = this.filter.apparel_property[group.prop_name];
      if (propertyId) {
        group_props.push(group.prop_name);
        names[group.prop_name] = group.properties.find(p => p.id === propertyId).name;
      }
    }
    this.filter.apparel_property_names = names;
    this.filter.group_props = group_props;
  }

  private async doAddPropertyGroup(propertyGroups, group, parentGroup, filterEntry) {
    propertyGroups.push(group);
    var groupIndex = propertyGroups.length - 1;
    if (parentGroup) {
      if (!parentGroup.childrenGroups)
        parentGroup.childrenGroups = [];
      parentGroup.childrenGroups.push(group);
    }
    var selectedId = filterEntry.apparel_property[group.prop_name];
    if (selectedId) {
      const childrenGroups = await this.loadChildGroups(propertyGroups, group, selectedId, filterEntry);
    } else {
      filterEntry.apparel_property[group.prop_name] = null;
    }
    return group;
  }

  private async loadChildGroups(propertyGroups, parentGroup, selectedId, filterEntry) {
    const childrenGroups = await this.propertyGroupService.children(parentGroup.id, selectedId);
    return await childrenGroups.map(async (group) => await this.doAddPropertyGroup(propertyGroups, group, parentGroup, filterEntry));
  }

  private async doGroupPropertySelectionChanged(propertyGroups, group, newValue, filterEntry) {
    if (group.childrenGroups) {
      for (var i = 0; i < group.childrenGroups.length; i++) {;
        var childGroup = group.childrenGroups[i];
        var childIndex = propertyGroups.indexOf(childGroup);
        if (childIndex > -1) {
          propertyGroups.splice(childIndex, 1);
          await this.doGroupPropertySelectionChanged(propertyGroups, childGroup, null, filterEntry);
        }
      }
    }

    if (newValue) {
      if (!group.loading) {
        group.loading = true;
        try {
          await this.loadChildGroups(propertyGroups, group, newValue, filterEntry)
        } finally {
          group.loading = false;
        }
      }
    } else {
      // caso o valor da propriedade esteja preenchida entao limpa
      filterEntry.apparel_property[group.prop_name] = null;
    }
  }

	// CLICK EVENTS
	search() {
    this.itemSearcherService.applyFilter(this.filter);
		this.viewCtrl.dismiss(this.filter);
  }

  cancel() {
		this.viewCtrl.dismiss();
  }

  async cleanFilters() {
    const filter = new SearchFilter;
    await this.reloadPropertyGroups(filter);
    this.filter = filter;
  }

}
