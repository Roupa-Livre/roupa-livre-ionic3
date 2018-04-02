import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-terms',
	templateUrl: 'terms.html',
})
export class TermsPage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams
	) {
		console.log('TERMSPAGE - CONSTRUCTOR');
	}

	ionViewDidLoad() {
		console.log('TERMSPAGE - IONVIEWDIDLOAD');
	}

	agree() {
		console.log('TERMSPAGE - AGREE');
		this.navCtrl.setRoot('ExplorePage');
	}

	cancel() {
		console.log('TERMSPAGE - CANCEL');
		this.navCtrl.setRoot("LoginPage");
	}

}
