import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-matched',
	templateUrl: 'matched.html',
})
export class MatchedPage {

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController
	) {
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
		console.log('MATCHED-PAGE - IONVIEWDIDLOAD');
	}

	// CLICK EVENTS
	goToChat() {
		console.log('MATCHED-PAGE - GOTOCHAT');
		this.viewCtrl.dismiss();
		this.navCtrl.push('ChatPage', { 'isNewMatch': true });
	}

	close() {
		console.log('MATCHED-PAGE - CLOSE');
		this.viewCtrl.dismiss();
	}
}
