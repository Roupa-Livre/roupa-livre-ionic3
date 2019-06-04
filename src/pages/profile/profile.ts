import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
})
export class ProfilePage {

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
	) {
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
	}

	// CLICK EVENTS
  goToOfferItem() {
    this.navCtrl.push('ItemFormPage', {}, {
			direction: 'forward'
		});
  }

  goToSettings() {
    this.navCtrl.push('SettingsPage', {}, {
			direction: 'forward'
		});
  }

}
