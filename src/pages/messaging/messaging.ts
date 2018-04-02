import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-messaging',
	templateUrl: 'messaging.html',
})
export class MessagingPage {

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams
	) {
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
		console.log('ionViewDidLoad MessagingPage');
	}

	// CLICK EVENTS
	goToChat(isNewMatch = false) {
		this.navCtrl.push('ChatPage', {isNewMatch: isNewMatch});
	}

	goToExplore() {
		this.navCtrl.push('ExplorePage', {}, {
			direction: 'back'
		});
	}

}
