import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PropertyGroupService } from '../../services/property-group-service';

const allowedCategories = ["acessory", "clothing", "shoes", "purse"];

@IonicPage()
@Component({
  selector: 'page-what-you-release',
  templateUrl: 'what-you-release.html',
})
export class WhatYouReleasePage {

  groups = [];
  selectedGroup = null;

  // CONSTRUCTOR
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private propertyGroupService: PropertyGroupService,
  ) {
    this.loadFirstTime();
  }

  async loadFirstTime() {
    const rootGroups: any[] = await this.propertyGroupService.root();
    if (rootGroups.length > 0) {
      const groups = [];
      for (const group of rootGroups[0].properties) {
        if (allowedCategories.indexOf(group.code) > -1) {
          groups.push(group);
        }
      }
      this.groups = groups;
    }
  }

  // LIFECYCLE EVENTS
  ionViewDidLoad() {
    this.loadFirstTime();
    console.log('ionViewDidLoad WhatYouReleasePage');
  }

  // CLICK EVENTS
  chooseReleaseOption(option) {
    console.log("WHATYOURELEASEPAGE - CHOOSERELEASEOPTION");
    this.selectedGroup = option;
  }

  releaseApparel() {
    this.navCtrl.push("WhatYouLookForPage", {}, {
			direction: 'forward'
		});
  }

  skip() {
    this.navCtrl.push("WhatYouLookForPage", {}, {
			direction: 'forward'
		});
  }

}
