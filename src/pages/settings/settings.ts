import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html',
})
export class SettingsPage {

	distance: number = 80;
	ageRange: object = {lower: 18, upper: 30};

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public viewCtrl: ViewController
	) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SettingsPage');
	}

	close() {
		this.viewCtrl.dismiss();
	}

}
