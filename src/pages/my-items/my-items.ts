import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnalyticsService } from '../../services/analytics-service';

@IonicPage()
@Component({
	selector: 'page-my-items',
	templateUrl: 'my-items.html',
})
export class MyItemsPage {

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
    private analyticsService: AnalyticsService
	) {
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
	}

  ionViewDidEnter() {
    this.analyticsService.trackPage('my-items');
  }

	// CLICK EVENTS
	goToItemDetails() {
		this.navCtrl.push('ItemDetailsPage');
	}

	edit() {
		this.navCtrl.push('ItemFormPage');
	}

	delete() {
		// TODO : DELETE ITEM
	}

}
