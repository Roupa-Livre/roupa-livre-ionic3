import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnalyticsService } from '../../services/analytics-service';
import { ToastService } from '../../services/toast-service';

@IonicPage()
@Component({
  selector: 'page-what-you-look-for',
  templateUrl: 'what-you-look-for.html',
})
export class WhatYouLookForPage {

  // CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private analyticsService: AnalyticsService,
    private toastService: ToastService,
  ) {
  }

  // LIFECYCLE EVENTS
  ionViewDidLoad() {
    console.log('ionViewDidLoad WhatYouLookForPage');
  }

  ionViewDidEnter() {
    this.analyticsService.trackPage('what-you-look-for');
  }

  // CLICK EVENTS
  chooseLookForOption() {
    console.log("WHATYOULOOKFORPAGE - CHOOSELOOKFOROPTION");
  }

  async searchApparels() {
    const loading = await this.toastService.showSimpleLoading();
    try {
      await this.navCtrl.push("ItemExplorePage", {}, { direction: 'forward' });
    } finally {
      loading.dismiss();
    }
  }

  async skip() {
    const loading = await this.toastService.showSimpleLoading();
    try {
      await this.navCtrl.popToRoot();
    } finally {
      loading.dismiss();
    }
  }

}
