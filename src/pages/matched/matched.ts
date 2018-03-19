import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-matched',
	templateUrl: 'matched.html',
})
export class MatchedPage {

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public viewCtrl: ViewController
	) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MatchedPage');
	}

	close() {
		this.viewCtrl.dismiss();
	}
}
