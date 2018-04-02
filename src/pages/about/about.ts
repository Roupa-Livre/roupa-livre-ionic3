import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-about',
	templateUrl: 'about.html',
})
export class AboutPage {

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams
	) {
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
		console.log('ABOUT-PAGE - IONVIEWDIDLOAD');
	}

	// CLICK EVENTS
	navigate(url: string) {
		console.log('ABOUT-PAGE - NAVIGATE');
		// TODO : IMPLEMENTS IN-APP BROWSER
	}

}
