import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-my-items',
	templateUrl: 'my-items.html',
})
export class MyItemsPage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams
	) {
	}

	ionViewDidLoad() {
	}

}
