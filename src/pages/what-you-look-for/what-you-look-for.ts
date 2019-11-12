import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnalyticsService } from '../../services/analytics-service';

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
    private analyticsService: AnalyticsService
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

  searchApparels() {
    // Tem que ser para a busca
    this.navCtrl.push("ItemExplorePage", {}, {
			direction: 'forward'
		});
  }

  skip() {
    this.navCtrl.popToRoot();
  }

}
