import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnalyticsService } from '../../services/analytics-service';
import { NavigationServiceProvider } from '../../services/navigation-service';
import { PropertyGroupService } from '../../services/property-group-service';
import { ToastService } from '../../services/toast-service';

const allowedCategories = ["acessory", "clothing", "shoes", "purse"];

@IonicPage()
@Component({
  selector: 'page-what-you-release',
  templateUrl: 'what-you-release.html',
})
export class WhatYouReleasePage {

  group;
  properties = [];
  selectedProperty = null;

  // CONSTRUCTOR
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private navigationService: NavigationServiceProvider,
    private propertyGroupService: PropertyGroupService,
    private analyticsService: AnalyticsService,
    private toastService: ToastService
  ) {
    this.loadGroups();
  }

  async loadGroups() {
    const rootGroups: any[] = await this.propertyGroupService.root();
    if (rootGroups.length > 0) {
      const properties = [];
      this.group = rootGroups[0];
      for (const property of this.group.properties) {
        if (allowedCategories.indexOf(property.code) > -1) {
          properties.push(property);
        }
      }
      this.properties = properties;
    }
  }

  // LIFECYCLE EVENTS
  ionViewDidLoad() {
    this.loadGroups();
    console.log('ionViewDidLoad WhatYouReleasePage');
  }

  ionViewCanEnter() {
    return this.navigationService.canEnterPage(this.navCtrl, 'WhatYouReleasePage');
  }

  ionViewDidEnter() {
    this.analyticsService.trackPage('what-you-release');
  }

  // CLICK EVENTS
  chooseReleaseOption(property) {
    console.log("WHATYOURELEASEPAGE - CHOOSERELEASEOPTION");
    this.selectedProperty = property;
  }

  async releaseApparel() {
    const loading = await this.toastService.showSimpleLoading();
    try {
      await this.navigationService.skipWhatYouRelease();
      await this.navCtrl.setRoot("ItemFormPage", { initialGroup: this.group, initialProperty: this.selectedProperty  }, { direction: 'forward' });
    } finally {
      loading.dismiss();
    }
  }

  async skip() {
    const loading = await this.toastService.showSimpleLoading();
    try {
      await this.navigationService.skipWhatYouRelease();
      await this.navigationService.checkRoot();
    } finally {
      loading.dismiss();
    }
  }

}
