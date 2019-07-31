import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-chat-main',
	templateUrl: 'chat-main.html',
})
export class ChatMainPage {

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams
	) {
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
	}

	// CLICK EVENTS
	goToChatDetails(isNewMatch = false) {
		this.navCtrl.push('ChatDetailsPage', { isNewMatch: isNewMatch });
	}

	goToExplore() {
		this.navCtrl.popToRoot();
	}

}
