import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-apparel-matched',
	templateUrl: 'apparel-matched.html',
})
export class ApparelMatchedPage {

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController
	) {
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
	}

	// CLICK EVENTS
	goToChat() {
		this.viewCtrl.dismiss();
		this.navCtrl.push('ChatDetailsPage', { 'isNewMatch': true });
	}

	close() {
		this.viewCtrl.dismiss();
	}
}
